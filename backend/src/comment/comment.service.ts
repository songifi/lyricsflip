import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RateLimiterService } from '../common/services/rate-limiter.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private eventEmitter: EventEmitter2,
    private rateLimiter: RateLimiterService,
  ) {}

  async create(userId: string, dto: CreateCommentDto): Promise<Comment> {
    // Check rate limit
    await this.rateLimiter.checkRateLimit(userId, 'comment_create', 5, 60); // 5 comments per minute

    // Create comment
    const comment = this.commentRepository.create({
      ...dto,
      userId,
    });

    // Save comment
    await this.commentRepository.save(comment);

    // Emit event
    this.eventEmitter.emit('comment.created', {
      userId,
      commentId: comment.id,
      contentType: dto.contentType,
      contentId: dto.contentId,
    });

    return comment;
  }

  async update(userId: string, commentId: string, dto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }

    // Update comment
    comment.content = dto.content;
    comment.isEdited = true;

    // Save changes
    await this.commentRepository.save(comment);

    // Emit event
    this.eventEmitter.emit('comment.updated', {
      userId,
      commentId: comment.id,
    });

    return comment;
  }

  async delete(userId: string, commentId: string): Promise<void> {
    const comment = await this.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    // Delete comment
    await this.commentRepository.remove(comment);

    // Emit event
    this.eventEmitter.emit('comment.deleted', {
      userId,
      commentId,
    });
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'replies'],
    });
  }

  async findByContent(
    contentType: string,
    contentId: string,
    page = 1,
    limit = 10,
  ): Promise<{ comments: Comment[]; total: number }> {
    const [comments, total] = await this.commentRepository.findAndCount({
      where: { contentType, contentId, parentId: null }, // Get only top-level comments
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { comments, total };
  }

  async getReplies(commentId: string, page = 1, limit = 10): Promise<{ replies: Comment[]; total: number }> {
    const [replies, total] = await this.commentRepository.findAndCount({
      where: { parentId: commentId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { replies, total };
  }

  async moderate(commentId: string, action: 'approve' | 'reject'): Promise<Comment> {
    const comment = await this.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    comment.isModerated = true;
    
    if (action === 'reject') {
      await this.commentRepository.remove(comment);
      this.eventEmitter.emit('comment.moderated', {
        commentId,
        action: 'rejected',
      });
      return null;
    }

    await this.commentRepository.save(comment);
    this.eventEmitter.emit('comment.moderated', {
      commentId,
      action: 'approved',
    });

    return comment;
  }

  async report(userId: string, commentId: string): Promise<Comment> {
    const comment = await this.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Increment report count
    comment.reportCount += 1;

    // Auto-moderate if report threshold is reached
    if (comment.reportCount >= 5) {
      return this.moderate(commentId, 'reject');
    }

    await this.commentRepository.save(comment);

    this.eventEmitter.emit('comment.reported', {
      userId,
      commentId,
      reportCount: comment.reportCount,
    });

    return comment;
  }

  async getActivityFeed(userId: string, page = 1, limit = 10): Promise<{ activities: Comment[]; total: number }> {
    const [activities, total] = await this.commentRepository.findAndCount({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { activities, total };
  }
}

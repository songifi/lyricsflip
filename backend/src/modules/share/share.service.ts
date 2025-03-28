import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Share } from './entities/share.entity';
import { CreateShareDto } from './dto/create-share.dto';
import { ShareType } from './enums/share-type.enum';
import { PlatformType } from './enums/platform-type.enum';
import { ShareAnalytics } from './entities/share-analytics.entity';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private shareRepository: Repository<Share>,
    @InjectRepository(ShareAnalytics)
    private analyticsRepository: Repository<ShareAnalytics>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createShare(createShareDto: CreateShareDto) {
    const share = this.shareRepository.create({
      ...createShareDto,
      createdAt: new Date(),
    });

    // Generate unique share link
    share.shareLink = await this.generateShareLink(share);

    // Generate preview if content type supports it
    if (this.supportsPreview(share.contentType)) {
      share.previewData = await this.generatePreview(share);
    }

    // Save share record
    const savedShare = await this.shareRepository.save(share);

    // Initialize analytics
    await this.analyticsRepository.save({
      shareId: savedShare.id,
      views: 0,
      clicks: 0,
      reshares: 0,
    });

    // Emit share created event
    this.eventEmitter.emit('share.created', savedShare);

    return savedShare;
  }

  async getShareById(id: string) {
    return this.shareRepository.findOne({ where: { id } });
  }

  async getSharedContent(filters: any) {
    const query = this.shareRepository.createQueryBuilder('share');

    if (filters.type) {
      query.andWhere('share.type = :type', { type: filters.type });
    }

    if (filters.platform) {
      query.andWhere('share.platform = :platform', { platform: filters.platform });
    }

    if (filters.userId) {
      query.andWhere('share.userId = :userId', { userId: filters.userId });
    }

    return query.getMany();
  }

  async trackShareView(shareId: string) {
    const analytics = await this.analyticsRepository.findOne({ where: { shareId } });
    analytics.views += 1;
    await this.analyticsRepository.save(analytics);
    this.eventEmitter.emit('share.viewed', { shareId });
  }

  async getShareAnalytics(shareId: string) {
    return this.analyticsRepository.findOne({ where: { shareId } });
  }

  private async generateShareLink(share: Share): Promise<string> {
    // Generate unique short ID for the share
    const shortId = Math.random().toString(36).substring(2, 8);
    return `${process.env.APP_URL}/share/${shortId}`;
  }

  private async generatePreview(share: Share): Promise<any> {
    // Implementation will vary based on content type
    // For lyrics cards, generate a preview image with partial lyrics
    return {
      title: share.title,
      description: share.description,
      thumbnail: share.thumbnailUrl,
    };
  }

  private supportsPreview(contentType: string): boolean {
    const supportedTypes = ['lyric_card', 'game_result', 'achievement'];
    return supportedTypes.includes(contentType);
  }

  async generatePlatformShare(shareId: string, platform: PlatformType) {
    const share = await this.getShareById(shareId);
    
    switch (platform) {
      case PlatformType.TWITTER:
        return this.formatTwitterShare(share);
      case PlatformType.FACEBOOK:
        return this.formatFacebookShare(share);
      case PlatformType.DISCORD:
        return this.formatDiscordShare(share);
      default:
        throw new Error('Unsupported platform');
    }
  }

  private formatTwitterShare(share: Share) {
    return {
      text: `Check out my ${share.type} on LyricsFlip! ${share.shareLink}`,
      hashtags: ['LyricsFlip', 'Music', 'Web3'],
    };
  }

  private formatFacebookShare(share: Share) {
    return {
      url: share.shareLink,
      quote: `Check out my ${share.type} on LyricsFlip!`,
    };
  }

  private formatDiscordShare(share: Share) {
    return {
      title: `LyricsFlip - ${share.type}`,
      description: share.description,
      url: share.shareLink,
      thumbnail: share.thumbnailUrl,
    };
  }
}

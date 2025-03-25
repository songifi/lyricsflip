import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AccessTokenGuard } from '../auth/guard/access-token/access-token.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@Controller('comments')
@UseGuards(AccessTokenGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(req.user.id, createCommentDto);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(req.user.id, id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.commentService.delete(req.user.id, id);
  }

  @Get('content/:type/:id')
  findByContent(
    @Param('type') type: string,
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.commentService.findByContent(type, id, page, limit);
  }

  @Get(':id/replies')
  getReplies(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.commentService.getReplies(id, page, limit);
  }

  @Post(':id/moderate')
  @UseGuards(RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  moderate(
    @Param('id') id: string,
    @Body('action') action: 'approve' | 'reject',
  ) {
    return this.commentService.moderate(id, action);
  }

  @Post(':id/report')
  report(@Request() req, @Param('id') id: string) {
    return this.commentService.report(req.user.id, id);
  }

  @Get('activity')
  getActivityFeed(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.commentService.getActivityFeed(req.user.id, page, limit);
  }
}

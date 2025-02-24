// controllers/friend.controller.ts
import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { FriendService } from '../services/friend.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('request')
  async sendFriendRequest(
    @CurrentUser() userId: string,
    @Body('receiverId') receiverId: string,
  ) {
    return this.friendService.sendFriendRequest(userId, receiverId);
  }

  @Post('request/:requestId/accept')
  async acceptFriendRequest(
    @CurrentUser() userId: string,
    @Param('requestId') requestId: string,
  ) {
    return this.friendService.acceptFriendRequest(userId, requestId);
  }

  @Get()
  async getFriends(@CurrentUser() userId: string) {
    return this.friendService.getFriends(userId);
  }
}
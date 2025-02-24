import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScoringService } from './scoring.service';

@Controller('scoring')
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  @Post('record')
  async recordScore(
    @Body('userId') userId: string,
    @Body('score') score: number,
  ) {
    return await this.scoringService.recordScore(userId, score);
  }

  @Get('rankings')
  async calculateRankings() {
    return await this.scoringService.calculateRankings();
  }

  @Get('user/:userId')
  async getUserStatistics(@Param('userId') userId: string) {
    return await this.scoringService.getUserStatistics(userId);
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return await this.scoringService.getLeaderboard();
  }
}

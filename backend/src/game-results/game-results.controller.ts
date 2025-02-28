import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { GameResultsService } from './game-results.service';
import { CreateGameResultDto } from './dto/game-result.dto';
import { GameResult } from './entities/game-result.entity';
import { LeaderboardEntryDto } from './dto/leaderboard-entry.dto';
// Assuming you have some form of authentication
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('game-results')
export class GameResultsController {
  constructor(private readonly gameResultsService: GameResultsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async createResult(@Body() createGameResultDto: CreateGameResultDto): Promise<GameResult> {
    return this.gameResultsService.createResult(createGameResultDto);
  }

  @Get('leaderboard/:gameId')
  async getLeaderboard(
    @Param('gameId') gameId: string,
    @Query('limit') limit?: number,
  ): Promise<LeaderboardEntryDto[]> {
    return this.gameResultsService.generateLeaderboard(gameId, limit);
  }

  @Get('user/:userId/game/:gameId/best')
  // @UseGuards(JwtAuthGuard)
  async getUserBest(
    @Param('userId') userId: string,
    @Param('gameId') gameId: string,
  ): Promise<GameResult | null> {
    return this.gameResultsService.getUserBest(userId, gameId);
  }

  @Get('user/:userId')
  // @UseGuards(JwtAuthGuard)
  async getUserResults(@Param('userId') userId: string): Promise<GameResult[]> {
    return this.gameResultsService.getUserResults(userId);
  }
}


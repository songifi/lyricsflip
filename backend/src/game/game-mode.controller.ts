// src/game/game-mode.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { GameModeService } from './game-mode.service';
import { GameSessionService } from './game-session.service';
import { MatchmakingService } from './matchmaking.service';
import { GameStatsService } from './game-stats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('game-modes')
export class GameModeController {
  constructor(
    private readonly gameModeService: GameModeService,
    private readonly gameSessionService: GameSessionService,
    private readonly matchmakingService: MatchmakingService,
    private readonly gameStatsService: GameStatsService,
  ) {}

  @Get()
  getAllModes() {
    return this.gameModeService.getAllModes();
  }

  @Get(':id')
  getModeById(@Param('id') id: string) {
    return this.gameModeService.getModeById(id);
  }

  @Get(':id/stats')
  getModeStats(@Param('id') id: string) {
    return this.gameStatsService.getModeStats(id);
  }

  @Get(':id/leaderboard')
  getModeLeaderboard(@Param('id') id: string) {
    return this.gameStatsService.getLeaderboard(id);
  }

  @Post('queue')
  @UseGuards(JwtAuthGuard)
  queueForGame(
    @User() user: any,
    @Body() queueData: { modeId: string; skill?: number }
  ) {
    this.matchmakingService.queuePlayer(
      user.id,
      queueData.modeId,
      queueData.skill || 1000 // Default skill level
    );
    return { message: 'Added to queue' };
  }

  @Delete('queue')
  @UseGuards(JwtAuthGuard)
  leaveQueue(@User() user: any) {
    const removed = this.matchmakingService.dequeuePlayer(user.id);
    return { 
      success: removed,
      message: removed ? 'Removed from queue' : 'Player not in queue'
    };
  }

  @Get('queue/status')
  @UseGuards(JwtAuthGuard)
  getQueueStatus(@User() user: any) {
    return this.matchmakingService.getQueueStatus(user.id);
  }

  @Get('sessions/active')
  @UseGuards(JwtAuthGuard)
  getActiveSessions() {
    return this.gameSessionService.getActiveSessions();
  }

  @Post('sessions/:id/end')
  @UseGuards(JwtAuthGuard)
  endSession(@Param('id') id: string) {
    return this.gameSessionService.endGameSession(id);
  }

  @Get('players/:id/stats')
  getPlayerStats(@Param('id') id: string) {
    return this.gameStatsService.getPlayerStats(id);
  }

  // Example of user decorator usage with full profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@User() user: any) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      preferences: user.preferences,
      // Include user stats
      stats: this.gameStatsService.getPlayerStats(user.id)
    };
  }

  // Example of user decorator usage with specific property
  @Get('username')
  @UseGuards(JwtAuthGuard)
  getUsername(@User('username') username: string) {
    return { username };
  }
}
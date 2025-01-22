import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LeaderboardService } from './providers/leaderboard.service';

// Controller for managing leaderboard operations.
@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  // Retrieve the global leaderboard.
  @Get()
  @ApiOperation({ summary: 'Get leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard retrieved' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }

  // Retrieve the rank of a specific player.
  // playerId - The ID of the player.
  @Get('rank/:playerId')
  @ApiOperation({ summary: 'Get player rank' })
  @ApiResponse({ status: 200, description: 'Player rank retrieved' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  getPlayerRank() {
    return this.leaderboardService.getPlayerRank();
  }
}

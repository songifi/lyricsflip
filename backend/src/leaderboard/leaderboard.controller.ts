import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LeaderboardService } from './providers/leaderboard.service';

// Controller for managing leaderboard operations.
@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  // Retrieve the global leaderboard.
  @Get()
  @ApiOperation({ summary: 'Get leaderboard', description: 'Retrieves the global leaderboard ranking' })
  @ApiResponse({ status: 200, description: 'Leaderboard successfully retrieved' })
  @ApiResponse({ status: 500, description: 'Internal server error occurred' })
  getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }

  // Retrieve the rank of a specific player.
  @Get('rank/:playerId')
  @ApiOperation({ summary: 'Get player rank', description: 'Retrieves the rank of a specific player' })
  @ApiParam({ 
    name: 'playerId', 
    type: 'string', 
    description: 'Unique identifier of the player', 
    example: 'player123' 
  })
  @ApiResponse({ status: 200, description: 'Player rank successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  getPlayerRank() {
    return this.leaderboardService.getPlayerRank();
  }
}
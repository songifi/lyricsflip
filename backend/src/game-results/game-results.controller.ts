import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  UseGuards,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GameResultsService } from './game-results.service';
// import { AuthGuard } from '../../auth/guards/auth.guard';
import { User } from 'src/user/user.entity';
import { GameSession } from 'src/game-session/game-session.entity';
import { GameResultProcessingException, InvalidGameSessionException } from './exceptions/game-result.exceptions';

@ApiTags('game-results')
@Controller('game-results')
// @UseGuards(AuthGuard)
@ApiBearerAuth()
export class GameResultsController {
  private readonly logger = new Logger(GameResultsController.name);

  constructor(private readonly gameResultsService: GameResultsService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process game results' })
  @ApiResponse({ status: 201, description: 'Results processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid game session' })
  @ApiResponse({ status: 500, description: 'Processing error' })
  async processResult(
    @Body() gameSession: GameSession,
    @User('id') userId: string
  ) {
    try {
      // Validate game session
      if (!this.isValidGameSession(gameSession)) {
        throw new InvalidGameSessionException();
      }

      // Ensure the game session belongs to the user
      if (gameSession.playerId !== userId) {
        throw new HttpException(
          'Unauthorized to process these results',
          HttpStatus.FORBIDDEN
        );
      }

      const result = await this.gameResultsService.processGameResult(gameSession);
      
      return {
        success: true,
        result,
        message: 'Game results processed successfully'
      };
    } catch (error) {
      this.logger.error(
        `Error processing game results: ${error.message}`,
        error.stack
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new GameResultProcessingException(
        'Failed to process game results'
      );
    }
  }

  @Get('player')
  @ApiOperation({ summary: 'Get player results history' })
  @ApiResponse({ status: 200, description: 'Results retrieved successfully' })
  async getPlayerResults(
    @User('id') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    try {
      const results = await this.gameResultsService.getPlayerResults(
        userId,
        { page, limit }
      );

      return {
        success: true,
        results,
        pagination: {
          page,
          limit,
          total: results.length
        }
      };
    } catch (error) {
      this.logger.error(
        `Error retrieving player results: ${error.message}`,
        error.stack
      );

      throw new HttpException(
        'Failed to retrieve player results',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('game/:id')
  @ApiOperation({ summary: 'Get specific game statistics' })
  @ApiResponse({ status: 200, description: 'Game stats retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Game result not found' })
  async getGameStats(@Param('id') gameId: string) {
    try {
      const stats = await this.gameResultsService.getGameStats(gameId);
      
      return {
        success: true,
        stats
      };
    } catch (error) {
      this.logger.error(
        `Error retrieving game stats: ${error.message}`,
        error.stack
      );

      if (error.status === 404) {
        throw error;
      }

      throw new HttpException(
        'Failed to retrieve game statistics',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get current leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard retrieved successfully' })
  async getLeaderboard(
    @Query('timeframe') timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time' = 'all-time',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    try {
      const leaderboard = await this.gameResultsService.getLeaderboard({
        timeframe,
        page,
        limit
      });

      return {
        success: true,
        leaderboard,
        pagination: {
          page,
          limit,
          total: leaderboard.length
        }
      };
    } catch (error) {
      this.logger.error(
        `Error retrieving leaderboard: ${error.message}`,
        error.stack
      );

      throw new HttpException(
        'Failed to retrieve leaderboard',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private isValidGameSession(gameSession: GameSession): boolean {
    return Boolean(
      gameSession &&
      gameSession.questions?.length > 0 &&
      gameSession.answers?.length === gameSession.questions.length &&
      gameSession.startTime &&
      gameSession.endTime
    );
  }
}
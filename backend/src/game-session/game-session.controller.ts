import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GameSessionService } from './providers/game-session.service';

// Controller for managing game sessions.
@ApiTags('game-session')
@Controller('game-session')
export class GameSessionController {
  constructor(private readonly gameSessionService: GameSessionService) {}

  // Start a new game session.
  @Post()
  @ApiOperation({ summary: 'Start a new game session' })
  @ApiResponse({
    status: 201,
    description: 'Game session successfully created',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  startGameSession() {
    return this.gameSessionService.startGameSession();
  }

  // Submit a guess for an ongoing game session.
  //  id - The ID of the game session.
  //  guess - The submitted guess details.
  @Post(':id/guess')
  @ApiOperation({ summary: 'Submit a guess for a game session' })
  @ApiResponse({ status: 200, description: 'Guess successfully submitted' })
  @ApiResponse({ status: 400, description: 'Invalid guess data' })
  submitGuess() {
    return this.gameSessionService.submitGuess();
  }

  // Retrieve the details of a specific game session.
  //  id - The ID of the game session.
  @Get(':id')
  @ApiOperation({ summary: 'Get game session details' })
  @ApiResponse({ status: 200, description: 'Game session details retrieved' })
  @ApiResponse({ status: 404, description: 'Game session not found' })
  getSessionDetails() {
    return this.gameSessionService.getSessionDetails();
  }
}

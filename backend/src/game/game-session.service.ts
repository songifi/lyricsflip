import { Injectable } from '@nestjs/common';
import { GameModeService } from './game-mode.service';
import { GameResult } from './interfaces/game-result.interface';
import { GameStatsService } from './game-stats.service';

@Injectable()
export class GameSessionService {
  private activeSessions: Map<string, {
    gameMode: string;
    players: string[];
    startTime: Date;
  }> = new Map();

  constructor(
    private readonly gameModeService: GameModeService,
    private readonly gameStatsService: GameStatsService,
  ) {}

  startGameSession(gameModeId: string, players: string[]): string {
    const gameMode = this.gameModeService.getModeById(gameModeId);
    const sessionId = gameMode.startGame(players);
    
    this.activeSessions.set(sessionId, {
      gameMode: gameModeId,
      players,
      startTime: new Date(),
    });
    
    return sessionId;
  }

  endGameSession(sessionId: string): GameResult {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Game session ${sessionId} not found`);
    }

    const gameMode = this.gameModeService.getModeById(session.gameMode);
    const result = gameMode.endGame(sessionId);
    
    // Update player statistics
    this.gameStatsService.updateStats(result);
    
    // Remove from active sessions
    this.activeSessions.delete(sessionId);
    
    return result;
  }

  getActiveSessions(): string[] {
    return Array.from(this.activeSessions.keys());
  }

  isSessionActive(sessionId: string): boolean {
    return this.activeSessions.has(sessionId);
  }
}
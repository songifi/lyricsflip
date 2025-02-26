import { GameMode } from './game-mode.interface';
import { GameResult } from './game-result.interface';
import { ScoringStrategy } from '../strategies/scoring/scoring-strategy.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseGameMode implements GameMode {
  id: string;
  name: string;
  description: string;
  rules: string[];
  maxPlayers: number;
  minPlayers: number;
  scoringStrategy: string;
  timeLimit?: number;
  protected activeSessions: Map<string, any> = new Map();
  
  constructor(protected scoringStrategyService: ScoringStrategy) {}

  abstract initialize(): void;

  startGame(players: string[]): string {
    if (players.length < this.minPlayers || players.length > this.maxPlayers) {
      throw new Error(`Player count must be between ${this.minPlayers} and ${this.maxPlayers}`);
    }

    const gameSessionId = `${this.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    this.activeSessions.set(gameSessionId, {
      id: gameSessionId,
      players,
      startTime: new Date(),
      playerStats: players.reduce((acc, playerId) => {
        acc[playerId] = this.initializePlayerStats();
        return acc;
      }, {}),
      status: 'active',
      timeLimit: this.timeLimit,
    });

    return gameSessionId;
  }

  protected abstract initializePlayerStats(): any;

  endGame(gameSessionId: string): GameResult {
    const session = this.activeSessions.get(gameSessionId);
    if (!session) {
      throw new Error(`Game session ${gameSessionId} not found`);
    }

    session.status = 'completed';
    session.endTime = new Date();

    // Calculate final scores and rankings
    const playerResults = Object.keys(session.playerStats).map(playerId => ({
      id: playerId,
      score: this.calculateScore(gameSessionId, playerId),
    }));

    // Sort by score descending to determine ranks
    playerResults.sort((a, b) => b.score - a.score);
    
    // Assign ranks
    let currentRank = 1;
    let previousScore = -1;
    
    playerResults.forEach((player, index) => {
      if (index > 0 && player.score < previousScore) {
        currentRank = index + 1;
      }
      player.rank = currentRank;
      previousScore = player.score;
    });

    const result: GameResult = {
      gameSessionId,
      gameMode: this.id,
      startTime: session.startTime,
      endTime: session.endTime,
      players: playerResults,
      winner: playerResults[0].id,
    };

    return result;
  }

  calculateScore(gameSessionId: string, playerId: string): number {
    const gameData = this.activeSessions.get(gameSessionId);
    if (!gameData) {
      throw new Error(`Game session ${gameSessionId} not found`);
    }

    if (!gameData.playerStats[playerId]) {
      throw new Error(`Player ${playerId} not found in game session`);
    }

    return this.scoringStrategyService.calculateScore(gameData, playerId);
  }
}

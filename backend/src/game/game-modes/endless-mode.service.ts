// src/game/game-modes/endless-mode.service.ts
import { Injectable } from '@nestjs/common';
import { BaseGameMode } from './base-game-mode';
import { EndlessScoringStrategy } from '../strategies/scoring/endless-scoring.strategy';

@Injectable()
export class EndlessModeService extends BaseGameMode {
  constructor(scoringStrategy: EndlessScoringStrategy) {
    super(scoringStrategy);
  }

  initialize(): void {
    this.id = 'endless';
    this.name = 'Endless Mode';
    this.description = 'Play until you can no longer continue, with increasing difficulty';
    this.rules = [
      'Difficulty increases over time',
      'No time limit',
      'Score based on endurance and difficulty level'
    ];
    this.maxPlayers = 1;
    this.minPlayers = 1;
    this.scoringStrategy = 'endless';
    // No time limit for endless mode
  }

  protected initializePlayerStats(): any {
    return {
      points: 0,
      level: 1,
      difficulty: 1.0,
      objectivesCompleted: 0,
      totalPlayTime: 0,
    };
  }
}

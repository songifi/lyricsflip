// src/game/game-modes/classic-mode.service.ts
import { Injectable } from '@nestjs/common';
import { BaseGameMode } from './base-game-mode';
import { ClassicScoringStrategy } from '../strategies/scoring/classic-scoring.strategy';

@Injectable()
export class ClassicModeService extends BaseGameMode {
  constructor(scoringStrategy: ClassicScoringStrategy) {
    super(scoringStrategy);
  }

  initialize(): void {
    this.id = 'classic';
    this.name = 'Classic Mode';
    this.description = 'Traditional gameplay with standard rules';
    this.rules = [
      'Complete all objectives to win',
      'Standard scoring applies',
      'No time limit'
    ];
    this.maxPlayers = 4;
    this.minPlayers = 1;
    this.scoringStrategy = 'classic';
  }

  protected initializePlayerStats(): any {
    return {
      points: 0,
      objectivesCompleted: 0,
      lives: 3,
    };
  }
}

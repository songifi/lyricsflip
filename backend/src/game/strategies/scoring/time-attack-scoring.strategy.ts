import { Injectable } from '@nestjs/common';
import { ScoringStrategy } from './scoring-strategy.interface';

@Injectable()
export class TimeAttackScoringStrategy implements ScoringStrategy {
  calculateScore(gameData: any, playerId: string): number {
    // Implementation based on time attack mode rules
    // Points based on speed of completion and accuracy
    const baseScore = gameData.playerStats[playerId].points;
    const timeBonus = Math.max(0, gameData.timeLimit - gameData.playerStats[playerId].timeTaken);
    return baseScore + (timeBonus * 10);
  }
}

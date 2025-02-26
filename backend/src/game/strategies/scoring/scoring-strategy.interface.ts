export interface ScoringStrategy {
    calculateScore(gameData: any, playerId: string): number;
  }
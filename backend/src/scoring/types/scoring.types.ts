export interface ScoreCalculationDto {
  playerId: string;
  questionId: string;
  isCorrect: boolean;
  responseTimeMs: number;
  currentStreak: number;
  difficultyLevel: number;
}

export interface ScoreResult {
  baseScore: number;
  timeBonus: number;
  streakBonus: number;
  totalScore: number;
  newStreak: number;
}

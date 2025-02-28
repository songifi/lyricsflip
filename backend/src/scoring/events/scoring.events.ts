import { ScoreResult } from '../types/scoring.types';

export class ScoreCalculatedEvent {
  constructor(
    public readonly playerId: string,
    public readonly scoreResult: ScoreResult,
    public readonly timestamp: Date,
  ) {}
}

export class StreakUpdatedEvent {
  constructor(
    public readonly playerId: string,
    public readonly newStreak: number,
    public readonly timestamp: Date,
  ) {}
}

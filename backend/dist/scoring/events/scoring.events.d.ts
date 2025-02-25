import { ScoreResult } from '../types/scoring.types';
export declare class ScoreCalculatedEvent {
    readonly playerId: string;
    readonly scoreResult: ScoreResult;
    readonly timestamp: Date;
    constructor(playerId: string, scoreResult: ScoreResult, timestamp: Date);
}
export declare class StreakUpdatedEvent {
    readonly playerId: string;
    readonly newStreak: number;
    readonly timestamp: Date;
    constructor(playerId: string, newStreak: number, timestamp: Date);
}

import { PlayerStats } from './player-stats.entity';
export declare class PlayerLevel {
    id: string;
    playerStats: PlayerStats;
    level: number;
    xpGained: number;
    totalXp: number;
    achievedAt: Date;
}

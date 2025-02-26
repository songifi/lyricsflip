import { PlayerLevel } from './player-level.entity';
import { PlayerSkill } from './player-skill.entity';
export declare class PlayerStats {
    id: string;
    userId: string;
    totalXp: number;
    level: number;
    skillRating: number;
    rank: string;
    achievements: string[];
    milestones: string[];
    levelHistory: PlayerLevel[];
    skills: PlayerSkill[];
    createdAt: Date;
    updatedAt: Date;
}

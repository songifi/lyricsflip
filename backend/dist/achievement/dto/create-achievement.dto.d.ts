import { AchievementCategory } from '../entities/achievement.entity';
export declare class CreateAchievementDto {
    title: string;
    description: string;
    icon: string;
    category: AchievementCategory;
    pointsValue: number;
    criteria: Record<string, any>;
}

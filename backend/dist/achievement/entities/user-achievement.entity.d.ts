import { Achievement } from './achievement.entity';
import { User } from '../../user/entities/user.entity';
export declare class UserAchievement {
    id: string;
    user: User;
    achievement: Achievement;
    progress: number;
    isCompleted: boolean;
    unlockedAt: Date;
}

import { Friend } from './friend.entity';
import { Activity } from './activity.entity';
export declare class Profile {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    stats: UserStats;
    achievements: Achievement[];
    lastActive: Date;
    friends: Friend[];
    activities: Activity[];
}

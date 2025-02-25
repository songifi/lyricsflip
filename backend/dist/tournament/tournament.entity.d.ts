import { User } from '../user/user.entity';
import { GameSession } from '../game-session/game-session.entity';
export declare class Tournament {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
    rules: Record<string, any>;
    participants: User[];
    matches: GameSession[];
}

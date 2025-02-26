import { ChatRoom } from '../chat-room/chat-room.entity';
import { GameSession } from '../game-session/game-session.entity';
export declare class Player {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    chatRoom: ChatRoom;
    gameSessions: GameSession[];
    score: number;
    highestStreak: number;
    currentStreak: number;
}

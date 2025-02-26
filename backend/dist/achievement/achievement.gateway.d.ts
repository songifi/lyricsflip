import { Server } from 'socket.io';
export declare class AchievementGateway {
    server: Server;
    handleAchievementUnlocked(payload: any): void;
}

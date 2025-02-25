import { Server } from 'socket.io';
export declare class ProgressionGateway {
    server: Server;
    handleXpAdded(payload: any): void;
    handleLevelUp(payload: any): void;
    handleRankChange(payload: any): void;
}

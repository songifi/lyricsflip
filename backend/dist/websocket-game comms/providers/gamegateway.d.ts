import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    private activeGames;
    private players;
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleCreateGame(client: Socket, data: {
        gameMode: string;
    }): Promise<{
        success: boolean;
        gameId: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        gameId?: undefined;
    }>;
    handleJoinGame(client: Socket, data: {
        gameId: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handleStartGame(client: Socket, data: {
        gameId: string;
    }): Promise<{
        success: boolean;
        error: any;
    }>;
    handleAnswer(client: Socket, data: {
        gameId: string;
        answer: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    private generateGameId;
    private validateToken;
    private startNewRound;
    private endRound;
    private handlePlayerLeave;
}

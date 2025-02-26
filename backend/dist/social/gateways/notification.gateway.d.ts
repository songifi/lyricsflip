import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private userSockets;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    sendNotification(userId: string, notification: Notification): Promise<void>;
    handleMarkRead(client: Socket, notificationId: string): Promise<void>;
}

// gateways/notification.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../guards/ws-jwt-auth.guard';

@WebSocketGateway()
@UseGuards(WsJwtAuthGuard)
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, Socket>();

  async handleConnection(client: Socket) {
    const userId = client.data.user.id;
    this.userSockets.set(userId, client);
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.user.id;
    this.userSockets.delete(userId);
  }

  async sendNotification(userId: string, notification: Notification) {
    const socket = this.userSockets.get(userId);
    if (socket) {
      socket.emit('notification', notification);
    }
  }

  @SubscribeMessage('markRead')
  async handleMarkRead(client: Socket, notificationId: string) {
    const userId = client.data.user.id;
    // Handle marking notification as read
  }
}

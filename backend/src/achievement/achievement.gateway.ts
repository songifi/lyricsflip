// src/achievement/achievement.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway()
export class AchievementGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('achievement.unlocked')
  handleAchievementUnlocked(payload: any) {
    this.server.to(payload.userId).emit('achievementUnlocked', {
      achievement: payload.achievement,
      unlockedAt: payload.unlockedAt,
    });
  }
}
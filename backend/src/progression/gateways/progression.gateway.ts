// src/progression/gateways/progression.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway()
export class ProgressionGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('progression.xp.added')
  handleXpAdded(payload: any) {
    this.server.to(payload.userId).emit('xpGained', payload);
  }

  @OnEvent('progression.level.up')
  handleLevelUp(payload: any) {
    this.server.to(payload.userId).emit('levelUp', payload);
  }

  @OnEvent('progression.rank.changed')
  handleRankChange(payload: any) {
    this.server.to(payload.userId).emit('rankChanged', payload);
  }
}
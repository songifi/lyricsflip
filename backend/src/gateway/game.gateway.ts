import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketAdapter,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameService } from '../services/game.service';

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateGameState')
  handleUpdateGameState(client: any, payload: any) {
    const updatedState = this.gameService.updateGameState(payload);
    this.server.emit('gameStateUpdated', updatedState);
  }

  @SubscribeMessage('playerAction')
  handlePlayerAction(client: any, payload: any) {
    const actionResult = this.gameService.handlePlayerAction(payload);
    this.server.emit('playerActionResult', actionResult);
  }

  @SubscribeMessage('syncTimer')
  handleSyncTimer(client: any, payload: any) {
    this.server.emit('timerSynced', payload);
  }

  @SubscribeMessage('liveScore')
  handleLiveScore(client: any, payload: any) {
    const scoreUpdate = this.gameService.updateScore(payload);
    this.server.emit('scoreUpdated', scoreUpdate);
  }
}
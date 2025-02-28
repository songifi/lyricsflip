import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from './game.gateway';
import { GameService } from '../services/game.service';
import { Socket } from 'socket.io';

describe('GameGateway', () => {
  let gateway: GameGateway;
  let service: GameService;

  const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  } as unknown as Socket;

  const mockGameService = {
    updateGameState: jest.fn(),
    playerAction: jest.fn(),
    syncTimer: jest.fn(),
    updateScore: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameGateway,
        { provide: GameService, useValue: mockGameService },
      ],
    }).compile();

    gateway = module.get<GameGateway>(GameGateway);
    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleGameStateUpdate', () => {
    it('should call updateGameState on the service', () => {
      const gameState = { /* mock game state */ };
      gateway.handleGameStateUpdate(gameState, mockSocket);
      expect(service.updateGameState).toHaveBeenCalledWith(gameState);
    });
  });

  describe('handlePlayerAction', () => {
    it('should call playerAction on the service', () => {
      const action = { /* mock player action */ };
      gateway.handlePlayerAction(action, mockSocket);
      expect(service.playerAction).toHaveBeenCalledWith(action);
    });
  });

  describe('handleTimerSync', () => {
    it('should call syncTimer on the service', () => {
      const timerData = { /* mock timer data */ };
      gateway.handleTimerSync(timerData, mockSocket);
      expect(service.syncTimer).toHaveBeenCalledWith(timerData);
    });
  });

  describe('handleLiveScoreUpdate', () => {
    it('should call updateScore on the service', () => {
      const scoreData = { /* mock score data */ };
      gateway.handleLiveScoreUpdate(scoreData, mockSocket);
      expect(service.updateScore).toHaveBeenCalledWith(scoreData);
    });
  });
});
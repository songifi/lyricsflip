import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './providers/player.service';
import { PlayerDTO } from './dtos/create-player.dto';

describe('PlayerController', () => {
  let playerController: PlayerController;
  let playerService: jest.Mocked<PlayerService>;

  beforeEach(async () => {
    const mockPlayerService = {
      allPlayers: jest.fn(),
      createPlayer: jest.fn(),
      viewPlayer: jest.fn(),
      updatePlayer: jest.fn(),
      deletePlayer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: mockPlayerService,
        },
      ],
    }).compile();

    playerController = module.get<PlayerController>(PlayerController);
    playerService = module.get(PlayerService);
  });

  describe('allPlayers', () => {
    it('should call playerService.allPlayers with default pagination', async () => {
      await playerController.allPlayers(undefined, undefined);
      expect(playerService.allPlayers).toHaveBeenCalledWith(1, 10);
    });

    it('should call playerService.allPlayers with custom pagination', async () => {
      await playerController.allPlayers(2, 20);
      expect(playerService.allPlayers).toHaveBeenCalledWith(2, 20);
    });
  });

  describe('createPlayer', () => {
    it('should call playerService.createPlayer with player data', async () => {
      const playerDto: PlayerDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      };
      await playerController.createPlayer(playerDto);
      expect(playerService.createPlayer).toHaveBeenCalledWith(playerDto);
    });
  });

  describe('viewPlayer', () => {
    it('should call playerService.viewPlayer with player id', async () => {
      const playerId = '1';
      await playerController.viewPlayer(playerId);
      expect(playerService.viewPlayer).toHaveBeenCalledWith(playerId);
    });
  });

  describe('updatePlayer', () => {
    it('should call playerService.updatePlayer with player id', async () => {
      const playerId = '1';
      await playerController.updatePlayer(playerId);
      expect(playerService.updatePlayer).toHaveBeenCalledWith(playerId);
    });
  });

  describe('deletePlayer', () => {
    it('should call playerService.deletePlayer with player id', async () => {
      const playerId = '1';
      await playerController.deletePlayer(playerId);
      expect(playerService.deletePlayer).toHaveBeenCalledWith(playerId);
    });
  });
});

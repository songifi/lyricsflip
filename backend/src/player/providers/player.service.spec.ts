import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Player } from '../player.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePlayerProvider } from './create-player.services';
import { PlayerDTO } from '../dtos/create-player.dto';
import { DeleteResult } from 'typeorm';

describe('PlayerService', () => {
  let playerService: PlayerService;
  let playerRepository: jest.Mocked<Repository<Player>>;
  let createPlayerProvider: jest.Mocked<CreatePlayerProvider>;

  beforeEach(async () => {
    const mockPlayerRepository = {
      findAndCount: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    } as any;

    const mockCreatePlayerProvider = {
      createPlayer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
        {
          provide: CreatePlayerProvider,
          useValue: mockCreatePlayerProvider,
        },
      ],
    }).compile();

    playerService = module.get<PlayerService>(PlayerService);
    playerRepository = module.get(getRepositoryToken(Player));
    createPlayerProvider = module.get(CreatePlayerProvider);
  });

  it('should be defined', () => {
    expect(playerService).toBeDefined();
    expect(playerRepository).toBeDefined();
    expect(createPlayerProvider).toBeDefined();
  });

  describe('allPlayers', () => {
    it('should return paginated players', async () => {
      const mockPlayers: Player[] = [
        {
          id: '1',
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@doe.com',
        } as Player,
      ];
      playerRepository.findAndCount.mockResolvedValue([mockPlayers, 1]);

      const result = await playerService.allPlayers(1, 10);

      expect(playerRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        data: mockPlayers,
        total: 1,
        page: 1,
        limit: 10,
      });
    });
  });

  describe('viewPlayer', () => {
    it('should return a player by ID', async () => {
      const mockPlayer: Player = {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      } as Player;
      playerRepository.findOneBy.mockResolvedValue(mockPlayer);

      const result = await playerService.viewPlayer('1');

      expect(playerRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockPlayer);
    });

    it('should return null if player not found', async () => {
      playerRepository.findOneBy.mockResolvedValue(null);

      const result = await playerService.viewPlayer('2');

      expect(playerRepository.findOneBy).toHaveBeenCalledWith({ id: '2' });
      expect(result).toBeNull();
    });
  });

  describe('updatePlayer', () => {
    it('should return a player by ID for updating', async () => {
      const mockPlayer: Player = {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      } as Player;
      playerRepository.findOneBy.mockResolvedValue(mockPlayer);

      const result = await playerService.updatePlayer('1');

      expect(playerRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockPlayer);
    });

    it('should return null if player not found for updating', async () => {
      playerRepository.findOneBy.mockResolvedValue(null);

      const result = await playerService.updatePlayer('2');

      expect(playerRepository.findOneBy).toHaveBeenCalledWith({ id: '2' });
      expect(result).toBeNull();
    });
  });

  describe('deletePlayer', () => {
    it('should delete a player and return result', async () => {
      const mockDeleteResult: DeleteResult = { affected: 1, raw: {} };
      playerRepository.delete.mockResolvedValue(mockDeleteResult);

      const result = await playerService.deletePlayer('1');

      expect(playerRepository.delete).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(mockDeleteResult);
    });

    it('should return result with affected = 0 if player not found for deletion', async () => {
      const mockDeleteResult: DeleteResult = { affected: 0, raw: {} };
      playerRepository.delete.mockResolvedValue(mockDeleteResult);

      const result = await playerService.deletePlayer('2');

      expect(playerRepository.delete).toHaveBeenCalledWith({ id: '2' });
      expect(result).toEqual(mockDeleteResult);
    });
  });

  describe('createPlayer', () => {
    it('should create a new player', async () => {
      const playerDto: PlayerDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      };
      const mockPlayer: Player = { id: '1', ...playerDto } as Player;

      createPlayerProvider.createPlayer.mockResolvedValue([mockPlayer]);

      const result = await playerService.createPlayer(playerDto);

      expect(createPlayerProvider.createPlayer).toHaveBeenCalledWith(playerDto);
      expect(result[0]).toEqual(mockPlayer);
    });

    it('should throw an error if create player fails', async () => {
      const playerDto: PlayerDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      };
      createPlayerProvider.createPlayer.mockRejectedValue(
        new Error('Failed to create player'),
      );

      await expect(playerService.createPlayer(playerDto)).rejects.toThrow(
        'Failed to create player',
      );
      expect(createPlayerProvider.createPlayer).toHaveBeenCalledWith(playerDto);
    });
  });
});

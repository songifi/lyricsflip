import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerProvider } from './create-player.services';
import { Player } from '../player.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerDTO } from '../dtos/create-player.dto';
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';

describe('CreatePlayerProvider', () => {
  let createPlayerProvider: CreatePlayerProvider;
  let playerRepository: jest.Mocked<Repository<Player>>;

  beforeEach(async () => {
    const mockPlayerRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlayerProvider,
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
      ],
    }).compile();

    createPlayerProvider =
      module.get<CreatePlayerProvider>(CreatePlayerProvider);
    playerRepository = module.get(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(createPlayerProvider).toBeDefined();
    expect(playerRepository).toBeDefined();
  });

  describe('createPlayer', () => {
    it('should create a new player successfully', async () => {
      const playerDto: PlayerDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      };
      const mockPlayer: Player = {
        id: '1',
        ...playerDto,
      } as Player;

      playerRepository.findOne.mockResolvedValue(null); // Email does not exist
      playerRepository.create.mockReturnValue(mockPlayer);
      playerRepository.save.mockResolvedValue(mockPlayer);

      const result = await createPlayerProvider.createPlayer(playerDto);

      expect(playerRepository.findOne).toHaveBeenCalledWith({
        where: { email: playerDto.email },
      });
      expect(playerRepository.create).toHaveBeenCalledWith(playerDto);
      expect(playerRepository.save).toHaveBeenCalledWith(mockPlayer);
      expect(result).toEqual([mockPlayer]);
    });

    it('should throw a BadRequestException if email already exists', async () => {
      const playerDto: PlayerDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      };
      const existingPlayer: Player = {
        id: '1',
        ...playerDto,
      } as Player;

      playerRepository.findOne.mockResolvedValue(existingPlayer);

      await expect(
        createPlayerProvider.createPlayer(playerDto),
      ).rejects.toThrow(BadRequestException);
      expect(playerRepository.findOne).toHaveBeenCalledWith({
        where: { email: playerDto.email },
      });
      expect(playerRepository.create).not.toHaveBeenCalled();
      expect(playerRepository.save).not.toHaveBeenCalled();
    });

    it('should throw a RequestTimeoutException if findOne throws an error', async () => {
      const playerDto: PlayerDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      };

      playerRepository.findOne.mockRejectedValue(new Error('Database error'));

      await expect(
        createPlayerProvider.createPlayer(playerDto),
      ).rejects.toThrow(RequestTimeoutException);
      expect(playerRepository.findOne).toHaveBeenCalledWith({
        where: { email: playerDto.email },
      });
      expect(playerRepository.create).not.toHaveBeenCalled();
      expect(playerRepository.save).not.toHaveBeenCalled();
    });

    it('should throw a RequestTimeoutException if save throws an error', async () => {
      const playerDto: PlayerDTO = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
      };
      const mockPlayer: Player = {
        id: '1',
        ...playerDto,
      } as Player;

      playerRepository.findOne.mockResolvedValue(null); // Email does not exist
      playerRepository.create.mockReturnValue(mockPlayer);
      playerRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(
        createPlayerProvider.createPlayer(playerDto),
      ).rejects.toThrow(RequestTimeoutException);
      expect(playerRepository.findOne).toHaveBeenCalledWith({
        where: { email: playerDto.email },
      });
      expect(playerRepository.create).toHaveBeenCalledWith(playerDto);
      expect(playerRepository.save).toHaveBeenCalledWith(mockPlayer);
    });
  });
});

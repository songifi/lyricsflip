import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './providers/player.service';
import { PlayerController } from './player.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerProvider } from './providers/create-player.services';

describe('PlayerModule', () => {
  let playerController: PlayerController;
  let playerService: PlayerService;
  let mockPlayerRepository: jest.Mocked<Repository<Player>>;

  beforeEach(async () => {
    mockPlayerRepository = {
      find: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        PlayerService,
        CreatePlayerProvider,
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
      ],
    }).compile();

    playerController = module.get<PlayerController>(PlayerController);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('Player controller to be defined', () => {
    expect(playerController).toBeDefined();
  });

  it('Player service to be defined', () => {
    expect(playerService).toBeDefined();
  });
});

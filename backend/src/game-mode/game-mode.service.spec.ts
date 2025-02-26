import { Test, TestingModule } from '@nestjs/testing';
import { GameModeService } from './game-mode.service';

describe('GameModeService', () => {
  let service: GameModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameModeService],
    }).compile();

    service = module.get<GameModeService>(GameModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

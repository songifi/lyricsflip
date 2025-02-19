import { Test, TestingModule } from '@nestjs/testing';
import { GameResultsService } from './game-results.service';

describe('GameResultsService', () => {
  let service: GameResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameResultsService],
    }).compile();

    service = module.get<GameResultsService>(GameResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

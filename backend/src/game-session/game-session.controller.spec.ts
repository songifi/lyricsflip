import { Test, TestingModule } from '@nestjs/testing';
import { GameSessionController } from './game-session.controller';

describe('GameSessionController', () => {
  let controller: GameSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameSessionController],
    }).compile();

    controller = module.get<GameSessionController>(GameSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

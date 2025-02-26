import { Test, TestingModule } from '@nestjs/testing';
import { GameModeController } from './game-mode.controller';
import { GameModeService } from './game-mode.service';

describe('GameModeController', () => {
  let controller: GameModeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameModeController],
      providers: [GameModeService],
    }).compile();

    controller = module.get<GameModeController>(GameModeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

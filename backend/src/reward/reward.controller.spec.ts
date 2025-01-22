import { Test, TestingModule } from '@nestjs/testing';
import { RewardController } from './reward.controller';

describe('RewardController', () => {
  let controller: RewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
    }).compile();

    controller = module.get<RewardController>(RewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

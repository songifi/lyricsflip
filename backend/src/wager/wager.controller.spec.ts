import { Test, TestingModule } from '@nestjs/testing';
import { WagerController } from './wager.controller';

describe('WagerController', () => {
  let controller: WagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WagerController],
    }).compile();

    controller = module.get<WagerController>(WagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

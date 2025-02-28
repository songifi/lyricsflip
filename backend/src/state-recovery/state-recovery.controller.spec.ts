import { Test, TestingModule } from '@nestjs/testing';
import { StateRecoveryController } from './state-recovery.controller';
import { StateRecoveryService } from './state-recovery.service';

describe('StateRecoveryController', () => {
  let controller: StateRecoveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateRecoveryController],
      providers: [StateRecoveryService],
    }).compile();

    controller = module.get<StateRecoveryController>(StateRecoveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

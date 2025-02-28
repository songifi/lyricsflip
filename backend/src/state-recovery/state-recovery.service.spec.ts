import { Test, TestingModule } from '@nestjs/testing';
import { StateRecoveryService } from './state-recovery.service';

describe('StateRecoveryService', () => {
  let service: StateRecoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateRecoveryService],
    }).compile();

    service = module.get<StateRecoveryService>(StateRecoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

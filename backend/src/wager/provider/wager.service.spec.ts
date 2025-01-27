import { Test, TestingModule } from '@nestjs/testing';
import { WagerService } from './wager.service';

describe('WagerService', () => {
  let service: WagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WagerService],
    }).compile();

    service = module.get<WagerService>(WagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

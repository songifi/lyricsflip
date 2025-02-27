import { Test, TestingModule } from '@nestjs/testing';
import { MusicEducationService } from './music-theory-lesson.service';

describe('MusicEducationService', () => {
  let service: MusicEducationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicEducationService],
    }).compile();

    service = module.get<MusicEducationService>(MusicEducationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

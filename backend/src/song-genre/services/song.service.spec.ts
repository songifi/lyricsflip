import { Test, TestingModule } from '@nestjs/testing';
import { SongGenreService } from './song.service';

describe('SongGenreService', () => {
  let service: SongGenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongGenreService],
    }).compile();

    service = module.get<SongGenreService>(SongGenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SongGenreController } from './song.controller';
import { SongGenreService } from '../services/song.service';

describe('SongGenreController', () => {
  let controller: SongGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongGenreController],
      providers: [SongGenreService],
    }).compile();

    controller = module.get<SongGenreController>(SongGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

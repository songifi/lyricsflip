import { Test, TestingModule } from '@nestjs/testing';
import { MusicTheoryLessonController } from './music-theory-lesson.controller';
import { MusicTheoryLessonService } from './music-theory-lesson.service';

describe('MusicTheoryLessonController', () => {
  let controller: MusicTheoryLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicTheoryLessonController],
      providers: [MusicTheoryLessonService],
    }).compile();

    controller = module.get<MusicTheoryLessonController>(MusicTheoryLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

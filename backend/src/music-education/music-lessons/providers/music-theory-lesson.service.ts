import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicLesson } from '../entities/music-theory-lesson.entity';

@Injectable()
export class MusicLessonsService {
  constructor(
    @InjectRepository(MusicLesson)
    private readonly lessonRepo: Repository<MusicLesson>,
  ) {}
  //hey
  findAll() {
    return this.lessonRepo.find();
  }

  findOne(id: number) {
    return this.lessonRepo.findOne({ where: { id } });
  }

  create(lesson: Partial<MusicLesson>) {
    return this.lessonRepo.save(lesson);
  }
}

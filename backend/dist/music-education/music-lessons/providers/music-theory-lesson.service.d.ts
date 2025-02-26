import { Repository } from 'typeorm';
import { MusicLesson } from '../entities/music-theory-lesson.entity';
export declare class MusicLessonsService {
    private readonly lessonRepo;
    constructor(lessonRepo: Repository<MusicLesson>);
    findAll(): Promise<MusicLesson[]>;
    findOne(id: number): Promise<MusicLesson>;
    create(lesson: Partial<MusicLesson>): Promise<Partial<MusicLesson> & MusicLesson>;
}

import { Repository } from 'typeorm';
import { MusicLesson } from '../music-lessons/entities/music-theory-lesson.entity';
export declare class LessonsService {
    private lessonRepository;
    constructor(lessonRepository: Repository<MusicLesson>);
    createLesson(title: string, content: string): Promise<MusicLesson>;
    getLessons(): Promise<MusicLesson[]>;
    getLessonById(id: number): Promise<MusicLesson>;
}

import { LessonsService } from '../providers/lessons.service';
import { MusicLesson } from '../music-lessons/entities/music-theory-lesson.entity';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    createLesson(body: {
        title: string;
        content: string;
    }): Promise<MusicLesson>;
    getLessons(): Promise<MusicLesson[]>;
    getLessonById(id: number): Promise<MusicLesson>;
}

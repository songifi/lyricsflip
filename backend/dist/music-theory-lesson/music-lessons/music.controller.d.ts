import { MusicLesson } from './entities/music-theory-lesson.entity';
import { MusicLessonsService } from './providers/music-theory-lesson.service';
export declare class MusicLessonsController {
    private readonly musicLessonsService;
    constructor(musicLessonsService: MusicLessonsService);
    findAll(): Promise<MusicLesson[]>;
    findOne(id: number): Promise<MusicLesson>;
    create(lesson: Partial<MusicLesson>): Promise<Partial<MusicLesson> & MusicLesson>;
}

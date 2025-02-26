import { MusicTheoryLessonService } from './music-theory-lesson.service';
import { CreateMusicTheoryLessonDto } from './dto/create-music-theory-lesson.dto';
import { UpdateMusicTheoryLessonDto } from './dto/update-music-theory-lesson.dto';
export declare class MusicTheoryLessonController {
    private readonly musicTheoryLessonService;
    constructor(musicTheoryLessonService: MusicTheoryLessonService);
    create(createMusicTheoryLessonDto: CreateMusicTheoryLessonDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMusicTheoryLessonDto: UpdateMusicTheoryLessonDto): string;
    remove(id: string): string;
}

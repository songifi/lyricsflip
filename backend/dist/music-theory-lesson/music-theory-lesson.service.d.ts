import { CreateMusicTheoryLessonDto } from './dto/create-music-theory-lesson.dto';
import { UpdateMusicTheoryLessonDto } from './dto/update-music-theory-lesson.dto';
export declare class MusicTheoryLessonService {
    create(createMusicTheoryLessonDto: CreateMusicTheoryLessonDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMusicTheoryLessonDto: UpdateMusicTheoryLessonDto): string;
    remove(id: number): string;
}

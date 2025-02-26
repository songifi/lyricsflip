import { MusicLesson } from 'src/music-theory-lesson/music-lessons/entities/music-theory-lesson.entity';
import { User } from 'src/user/user.entity';
export declare class UserProgress {
    id: number;
    userId: User;
    lesson: MusicLesson;
    completed: boolean;
}

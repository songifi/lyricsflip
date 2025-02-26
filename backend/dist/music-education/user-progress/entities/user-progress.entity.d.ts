import { MusicLesson } from 'src/music-education/music-lessons/entities/music-theory-lesson.entity';
import { User } from 'src/user/user.entity';
export declare class UserProgress {
    id: number;
    user: User;
    lesson: MusicLesson;
    completed: boolean;
}

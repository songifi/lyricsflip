import { MusicLesson } from 'src/music-education/music-lessons/entities/music-theory-lesson.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => MusicLesson, { eager: true })
  lesson: MusicLesson;

  @Column({ default: false })
  completed: boolean;
}

// src/questions/entities/question.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Song } from '../../songs/entities/song.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Song, { eager: true })
  song: Song;

  @Column('text')
  lyricSnippet: string;

  @Column('simple-array')
  options: string[];

  @Column()
  correctAnswer: number;

  @Column()
  difficulty: number;

  @Column()
  points: number;

  @Column()
  timeLimit: number;

  @Column({ default: 0 })
  timesUsed: number;

  @Column({ default: 0 })
  correctAnswers: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

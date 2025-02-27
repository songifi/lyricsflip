import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column('text')
  lyrics: string;

  @Column()
  genre: string;

  // @Column()
  // difficulty: number;

  @ManyToOne(() => Difficulty)
  @JoinColumn({ name: 'difficultyId' })
  difficulty: Difficulty;

  @Column()
  difficultyId: string;

  @Column({ default: 0 })
  playCount: number;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column()
  releaseYear: number;

  @Column()
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
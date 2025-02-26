import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class UserGenrePreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Genre)
  genre: Genre;

  @Column('float', { default: 0 })
  preferenceScore: number;

  @Column('int', { default: 0 })
  playCount: number;

  @Column('float', { default: 0 })
  averagePerformance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
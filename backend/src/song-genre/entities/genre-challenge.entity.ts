import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class GenreChallenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Genre)
  genre: Genre;

  @Column('text')
  description: string;

  @Column('json')
  requirements: Record<string, any>;

  @Column('int')
  experienceReward: number;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}

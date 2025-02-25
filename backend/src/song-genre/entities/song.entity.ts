import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Genre } from './genre.entity';
import { Tag } from './tag.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column('int')
  durationSeconds: number;

  @Column('float')
  baseDifficulty: number;

  @Column('float', { nullable: true })
  calculatedDifficulty: number;

  @Column('json')
  difficultyFactors: Record<string, number>;

  @ManyToOne(() => Genre, genre => genre.songs)
  genre: Genre;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @Column('int', { default: 0 })
  playCount: number;

  @Column('float', { default: 0 })
  averageScore: number;

  @Column('float', { default: 0 })
  completionRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

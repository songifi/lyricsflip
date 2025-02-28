import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('game_results')
export class GameResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: string;

  @Column()
  gameId: string;

  @Column('json')
  gameData: any;

  @Column('int')
  score: number;

  @Column('int')
  timeSpent: number;

  @Column('json', { nullable: true })
  achievements: any[];

  @CreateDateColumn()
  @Index()
  createdAt: Date;
}
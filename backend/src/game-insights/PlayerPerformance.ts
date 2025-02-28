import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class PlayerPerformance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: string;

  @Column()
  gameTitle: string;

  @Column()
  score: number;

  @Column()
  accuracy: number;

  @Column()
  responseTime: number; 

  @CreateDateColumn()
  createdAt: Date;
}

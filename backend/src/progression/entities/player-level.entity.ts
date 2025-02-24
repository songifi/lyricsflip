// src/progression/entities/player-level.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { PlayerStats } from './player-stats.entity';

@Entity()
export class PlayerLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PlayerStats, stats => stats.levelHistory)
  playerStats: PlayerStats;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'int' })
  xpGained: number;

  @Column({ type: 'int' })
  totalXp: number;

  @CreateDateColumn()
  achievedAt: Date;
}
// src/progression/entities/player-skill.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PlayerStats } from './player-stats.entity';

@Entity()
export class PlayerSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PlayerStats, stats => stats.skills)
  playerStats: PlayerStats;

  @Column()
  name: string;

  @Column({ type: 'int', default: 0 })
  level: number;

  @Column({ type: 'int', default: 0 })
  experience: number;
}
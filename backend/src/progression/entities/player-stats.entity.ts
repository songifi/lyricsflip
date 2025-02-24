// src/progression/entities/player-stats.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PlayerLevel } from './player-level.entity';
import { PlayerSkill } from './player-skill.entity';

@Entity()
export class PlayerStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'int', default: 0 })
  totalXp: number;

  @Column({ type: 'int', default: 1 })
  level: number;

  @Column({ type: 'int', default: 0 })
  skillRating: number;

  @Column()
  rank: string;

  @Column('json')
  achievements: string[];

  @Column('json')
  milestones: string[];

  @OneToMany(() => PlayerLevel, level => level.playerStats)
  levelHistory: PlayerLevel[];

  @OneToMany(() => PlayerSkill, skill => skill.playerStats)
  skills: PlayerSkill[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
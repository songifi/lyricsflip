// Achievement System Implementation

// src/achievement/entities/achievement.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AchievementCategory {
  STREAK = 'STREAK',
  SCORE = 'SCORE',
  GENRE = 'GENRE',
  SOCIAL = 'SOCIAL',
  MISC = 'MISC',
}

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  icon: string;

  @Column({ type: 'enum', enum: AchievementCategory })
  category: AchievementCategory;

  @Column('int')
  pointsValue: number;

  @Column('json')
  criteria: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
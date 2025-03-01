import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class UserBehavior {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: string;

  @Column()
  gameTitle: string;

  @Column()
  actionType: string;  // e.g., "click", "purchase", "abandon"

  @Column()
  genrePreference: string;  // e.g., "FPS", "RPG", "Strategy"

  @CreateDateColumn()
  createdAt: Date;
}

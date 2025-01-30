import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique identifier for the user

  @Column({ unique: true })
  name: string; // The username for the player

  @Column({ unique: true })
  email: string; // Player's email for account identification and recovery

  @Exclude() // passwords should not be return when user is return
  @Column()
  password: string; // Hashed password for security

  @Column({ nullable: true })
  avatar: string; // Optional profile picture URL

  @Column({ default: 0 })
  tokens: number; // Amount of in-game tokens the player owns

  @Column({ default: 0 })
  totalScore: number; // Cumulative score across all games played

  @Column({ default: 0 })
  gamesPlayed: number; // Total number of games the user has participated in

  @Column({ default: 0 })
  gamesWon: number; // Number of games the user has won

  @CreateDateColumn()
  createdAt: Date; // Timestamp for when the account was created

  @UpdateDateColumn()
  updatedAt: Date; // Timestamp for the last account update
}

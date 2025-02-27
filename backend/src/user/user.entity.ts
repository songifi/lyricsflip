import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../common/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique identifier for the user

  // Common Attributes
  @Column({ unique: true })
  username: string; // The username for the player

  @Column({ unique: true })
  email: string; // Player's email for account identification and recovery

  @Exclude() // Passwords should not be returned when the user is returned
  @Column()
  password: string; // Hashed password for security

  @Column({ nullable: true })
  avatar: string; // Optional profile picture URL

  @Column({ default: 0 })
  tokens: number; // Amount of in-game tokens the player owns

  // Player Attributes
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ default: 0 })
  totalScore: number; // Cumulative score across all games played

  @Column({ default: 0 })
  gamesPlayed: number; // Total number of games the user has participated in

  @Column({ default: 0 })
  gamesWon: number; // Number of games the user has won

  // Role Attribute
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole; // Users roles (admin, player or user) refer to UserRole enum

  @CreateDateColumn()
  createdAt: Date; // Timestamp for when the account was created

  @UpdateDateColumn()
  updatedAt: Date; // Timestamp for the last account update

  @Column({ default: 0 })
  points: number;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_activity')
export class UserActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  firstActiveAt: Date; // First recorded activity

  @UpdateDateColumn()
  lastActiveAt: Date; // Last recorded activity

  @Column({ default: 0 })
  totalSessions: number; // Total sessions user has had

  @Column({ default: 0 })  // ✅ **Add this line**
  totalSessionDuration: number; // Total session duration in minutes

  @Column({ default: false })
  activeToday: boolean;

  @Column({ default: false })
  activeThisWeek: boolean;

  @Column({ default: false })
  activeThisMonth: boolean;

  @Column("simple-array", { nullable: true })
  retentionDays: number[]; // Array to track retention days (e.g., [1, 7, 30])
}

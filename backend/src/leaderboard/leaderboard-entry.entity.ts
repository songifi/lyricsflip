import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('leaderboard_entries')
export class LeaderboardEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  playerId: string;

  @Column()
  playerName: string;

  @Column({ type: 'int', default: 0 })
  score: number;
}

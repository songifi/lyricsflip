import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Player } from "../player/player.entity";

@Entity('game_sessions')
export class GameSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  startTime: Date;

  @Column({ type: "timestamp", nullable: true })
  endTime: Date;

  @Column({ type: "enum", enum: ["active", "completed", "canceled"], default: "active" })
  status: string;

  @Column({ type: "int", default: 4 })
  maxPlayers: number;

  @Column({ type: "decimal", nullable: true })
  score: number;

  @Column({ type: "varchar", nullable: true })
  location: string;

  @Column({ type: "json", nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  description: string;

  @ManyToMany(() => Player, player => player.gameSessions, { cascade: true })
  players: Player[];
}

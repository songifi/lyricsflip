import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Player } from "../player/player.entity";
import { GameSession } from "../game-session/game-session.entity";

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Player, player => player.room)
  players: Player[];

  @OneToMany(() => GameSession, gameSession => gameSession.room)
  gameSessions: GameSession[];
}
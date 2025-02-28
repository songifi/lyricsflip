import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PlayerRoom } from './player-room.entity';

export enum PlayerStatus {
  ONLINE = 'online',
  AWAY = 'away',
  BUSY = 'busy',
  OFFLINE = 'offline',
}

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: PlayerStatus,
    default: PlayerStatus.OFFLINE
  })
  status: PlayerStatus;

  @OneToMany(() => PlayerRoom, playerRoom => playerRoom.player)
  playerRooms: PlayerRoom[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

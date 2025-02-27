
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PlayerRoom } from './player-room.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 10 })
  capacity: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => PlayerRoom, playerRoom => playerRoom.room)
  playerRooms: PlayerRoom[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

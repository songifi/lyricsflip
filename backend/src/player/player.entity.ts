import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ChatRoom } from '../chat-room/chat-room.entity';
import { GameSession } from '../game-session/game-session.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.players)
  chatRoom: ChatRoom;

  @ManyToMany(() => GameSession, gameSession => gameSession.players)
  @JoinTable()
  gameSessions: GameSession[];
}
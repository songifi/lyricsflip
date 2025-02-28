import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Player } from "../player/player.entity";

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "text" })
  message: string;

  @Column({ type: "enum", enum: ["info", "warning", "alert"], default: "info" })
  type: string;

  @Column({ type: "boolean", default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity("player_engagement_metrics")
export class PlayerEngagementMetric {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  @Index()
  userId: string

  @Column()
  sessionCount: number

  @Column("float")
  sessionDuration: number

  @Column("json")
  activityData: Record<string, any>

  @CreateDateColumn()
  @Index()
  timestamp: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column("json", { nullable: true })
  metadata: Record<string, any>
}


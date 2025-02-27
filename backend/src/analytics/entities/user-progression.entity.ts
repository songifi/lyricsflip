import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity("user_progression_metrics")
export class UserProgressionMetric {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  @Index()
  userId: string

  @Column()
  level: number

  @Column("float")
  experience: number

  @Column("simple-array")
  achievements: string[]

  @Column("json")
  progressionData: Record<string, any>

  @CreateDateColumn()
  @Index()
  timestamp: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column("json", { nullable: true })
  metadata: Record<string, any>
}


import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity("song_category_metrics")
export class SongCategoryMetric {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  @Index()
  categoryId: string

  @Column()
  categoryName: string

  @Column()
  playCount: number

  @Column()
  uniqueUsers: number

  @Column("float")
  averagePlayTime: number

  @Column("json")
  popularityTrend: Record<string, number>

  @CreateDateColumn()
  @Index()
  timestamp: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column("json", { nullable: true })
  metadata: Record<string, any>
}


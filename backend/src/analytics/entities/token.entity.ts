import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity("token_metrics")
export class TokenMetric {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("float")
  totalSupply: number

  @Column("float")
  circulation: number

  @Column()
  transactions: number

  @Column("float")
  averageHolding: number

  @Column("json")
  distributionData: Record<string, number>

  @CreateDateColumn()
  @Index()
  timestamp: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column("json", { nullable: true })
  metadata: Record<string, any>
}


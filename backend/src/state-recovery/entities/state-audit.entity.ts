@Entity()
export class StateAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GameState)
  gameState: GameState;

  @Column()
  action: string;

  @Column('json')
  previousState: any;

  @Column('json')
  newState: any;

  @Column()
  triggeredBy: string;

  @CreateDateColumn()
  timestamp: Date;
}
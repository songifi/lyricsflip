import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class GameMode {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('json')
  rules: {
    timeLimit: number;
    pointSystem: Record<string, number>;
    powerUpsAllowed: string[];
    minimumPlayers: number;
    specialConditions: string[];
  };

  @Column()
  isPublic: boolean;

  @ManyToOne(() => User, (user) => user.gameModes)
  creator: User;
}
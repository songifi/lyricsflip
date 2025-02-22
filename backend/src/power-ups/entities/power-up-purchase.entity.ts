import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PowerUp } from './power-up.entity';
import { User } from '../users/user.entity';

@Entity()
export class PowerUpPurchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PowerUp)
  powerUp: PowerUp;

  @ManyToOne(() => User)
  user: User;

  @Column()
  purchaseDate: Date;

  @Column()
  expirationDate: Date;

  @Column({ default: false })
  isUsed: boolean;
}

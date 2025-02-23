import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PowerUp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  price: number;
}

import { User } from 'src/user/user.entity';
// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  points: number;

  @Column('json')
  criteria: Record<string, any>;

  @ManyToMany(() => User, (user) => user.achievements)
  @JoinTable()
  unlockedBy: User[];
}
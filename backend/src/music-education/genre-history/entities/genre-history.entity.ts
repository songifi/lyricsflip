import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GenreHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genre: string;

  @Column('text')
  history: string;
}

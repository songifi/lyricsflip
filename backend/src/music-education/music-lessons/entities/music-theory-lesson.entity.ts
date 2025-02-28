import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MusicLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  genre: string;

  @Column()
  difficulty: string;
}

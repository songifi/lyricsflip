import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => Comment, comment => comment.replies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  parent: Comment;

  @OneToMany(() => Comment, comment => comment.parent)
  replies: Comment[];

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  contentType: string; // 'song', 'playlist', etc.

  @Column()
  contentId: string;

  @Column({ default: false })
  isEdited: boolean;

  @Column({ default: false })
  isModerated: boolean;

  @Column({ default: 0 })
  reportCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

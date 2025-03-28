import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ShareType } from '../enums/share-type.enum';
import { PlatformType } from '../enums/platform-type.enum';

@Entity('shares')
export class Share {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: ShareType,
  })
  type: ShareType;

  @Column()
  contentId: string;

  @Column()
  contentType: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column()
  shareLink: string;

  @Column({ type: 'json', nullable: true })
  previewData: any;

  @Column({
    type: 'enum',
    enum: PlatformType,
    default: PlatformType.INTERNAL,
  })
  platform: PlatformType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

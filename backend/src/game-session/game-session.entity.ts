import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('games')
export class GameSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player1: string;

    @Column()
    player2: string;

    @Column({ default: false })
    isFinished: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
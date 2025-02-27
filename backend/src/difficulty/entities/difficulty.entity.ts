import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('difficulties')
export class Difficulty {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    value: number;

    @Column()
    name: string; // Easy, Medium or Hard
}
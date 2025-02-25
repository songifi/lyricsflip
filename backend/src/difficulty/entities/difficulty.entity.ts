import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('difficulties')
export class Difficulty {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    value: number; // Numeric value, corresponding to the value defined in the songs entity

    @Column()
    name: string;
}
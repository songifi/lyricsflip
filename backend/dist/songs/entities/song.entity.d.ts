import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
export declare class Song {
    id: string;
    title: string;
    artist: string;
    lyrics: string;
    genre: string;
    difficulty: Difficulty;
    difficultyId: string;
    playCount: number;
    tags: string[];
    releaseYear: number;
    language: string;
    createdAt: Date;
    updatedAt: Date;
}

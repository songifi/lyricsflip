import { Difficulty } from "./entities/difficulty.entity";
import { Repository } from "typeorm";
export declare class DifficultyService {
    private readonly difficultyRepository;
    constructor(difficultyRepository: Repository<Difficulty>);
    findAll(): Promise<Difficulty[]>;
    findDifficulty(difficultyName: string): Promise<Difficulty>;
}

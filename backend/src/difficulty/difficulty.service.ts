import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Difficulty } from "./entities/difficulty.entity";
import { Repository } from "typeorm";

@Injectable()
export class DifficultyService {
    constructor(
        @InjectRepository(Difficulty)
        private readonly difficultyRepository: Repository<Difficulty>
    ) {}

    async findAll (): Promise<Difficulty[]>{
        return this.difficultyRepository.find();
    }

    async findDifficulty(difficultyName: string): Promise<Difficulty>{
        return this.difficultyRepository.findOne({
            where: { name: difficultyName }
        })
    }
}
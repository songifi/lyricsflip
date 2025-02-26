import { Repository } from 'typeorm';
import { UserProgress } from '../entities/user-progress.entity';
export declare class UserProgressService {
    private readonly progressRepo;
    constructor(progressRepo: Repository<UserProgress>);
    findAll(): Promise<UserProgress[]>;
    findByUser(userId: string): Promise<UserProgress[]>;
    markComplete(progressId: number): Promise<import("typeorm").UpdateResult>;
}

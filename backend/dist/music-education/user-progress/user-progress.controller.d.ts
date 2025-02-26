import { UserProgressService } from './providers/user-progress.service';
export declare class UserProgressController {
    private readonly userProgressService;
    constructor(userProgressService: UserProgressService);
    findAll(): Promise<import("./entities/user-progress.entity").UserProgress[]>;
    findByUser(user: string): Promise<import("./entities/user-progress.entity").UserProgress[]>;
    markComplete(id: number): Promise<import("typeorm").UpdateResult>;
}

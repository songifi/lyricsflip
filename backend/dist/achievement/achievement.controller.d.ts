import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
export declare class AchievementController {
    private readonly achievementService;
    constructor(achievementService: AchievementService);
    create(createAchievementDto: CreateAchievementDto): Promise<import("./entities/achievement.entity").Achievement>;
    getUserAchievements(userId: string): any;
    getLeaderboard(): any;
}

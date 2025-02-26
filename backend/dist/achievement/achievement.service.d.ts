import { Repository } from 'typeorm';
import { Achievement } from './entities/achievement.entity';
import { UserAchievement } from './entities/user-achievement.entity';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AchievementService {
    private achievementRepository;
    private userAchievementRepository;
    private eventEmitter;
    constructor(achievementRepository: Repository<Achievement>, userAchievementRepository: Repository<UserAchievement>, eventEmitter: EventEmitter2);
    create(createAchievementDto: CreateAchievementDto): Promise<Achievement>;
    trackProgress(userId: string, eventType: string, eventData: any): Promise<void>;
    unlockAchievement(userId: string, achievementId: string): Promise<void>;
    private getUserAchievement;
    private calculateProgress;
    private evaluateCriteria;
}

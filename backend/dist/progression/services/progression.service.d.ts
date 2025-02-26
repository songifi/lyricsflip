import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayerStats } from '../entities/player-stats.entity';
import { PlayerLevel } from '../entities/player-level.entity';
import { XpEventDto } from '../dtos/xp-event.dto';
export declare class ProgressionService {
    private playerStatsRepository;
    private playerLevelRepository;
    private eventEmitter;
    constructor(playerStatsRepository: Repository<PlayerStats>, playerLevelRepository: Repository<PlayerLevel>, eventEmitter: EventEmitter2);
    addXp(xpEvent: XpEventDto): Promise<PlayerStats>;
    private handleLevelUp;
    private calculateLevel;
    private calculateLevelXp;
    private calculateLevelUpRewards;
    private updateSkillRating;
    private updateRank;
    private getOrCreatePlayerStats;
}

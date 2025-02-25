import { ProgressionService } from '../services/progression.service';
import { XpEventDto } from '../dtos/xp-event.dto';
export declare class ProgressionController {
    private readonly progressionService;
    constructor(progressionService: ProgressionService);
    addXp(xpEvent: XpEventDto): Promise<import("../entities/player-stats.entity").PlayerStats>;
    getPlayerStats(userId: string): Promise<import("../entities/player-stats.entity").PlayerStats>;
}

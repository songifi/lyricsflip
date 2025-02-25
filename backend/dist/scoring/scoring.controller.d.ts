import { ScoringService } from './scoring.service';
import { CreateScoringDto } from './dto/create-scoring.dto';
import { UpdateScoringDto } from './dto/update-scoring.dto';
export declare class ScoringController {
    private readonly scoringService;
    constructor(scoringService: ScoringService);
    recordScore(createScoringDto: CreateScoringDto): Promise<import("./entities/scoring.entity").Scoring>;
    calculateRankings(): Promise<import("./entities/scoring.entity").Scoring[]>;
    getUserStatistics(userId: string): Promise<import("./entities/scoring.entity").Scoring>;
    getLeaderboard(): Promise<import("./entities/scoring.entity").Scoring[]>;
    updateScore(id: number, updateScoringDto: UpdateScoringDto): Promise<import("./entities/scoring.entity").Scoring>;
}

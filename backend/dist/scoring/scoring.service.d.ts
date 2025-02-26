import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { ScoreCalculationDto, ScoreResult } from './types/scoring.types';
import { Player } from 'src/player/player.entity';
import { Scoring } from './entities/scoring.entity';
import { UpdateScoringDto } from './dto/update-scoring.dto';
export declare class ScoringService {
    private readonly playerRepository;
    private readonly scoringRepository;
    private eventEmitter;
    constructor(playerRepository: Repository<Player>, scoringRepository: Repository<Scoring>, eventEmitter: EventEmitter2);
    calculateScore(params: ScoreCalculationDto): ScoreResult;
    private calculateBaseScore;
    private calculateTimeBonus;
    private calculateStreakBonus;
    private getDifficultyMultiplier;
    private isValidResponseTime;
    updatePlayerScore(playerId: string, scoreResult: ScoreResult): Promise<void>;
    recordScore(userId: string, score: number): Promise<Scoring>;
    calculateRankings(): Promise<Scoring[]>;
    getUserStatistics(userId: string): Promise<Scoring | null>;
    getLeaderboard(): Promise<Scoring[]>;
    updateScore(id: number, updateScoringDto: UpdateScoringDto): Promise<Scoring>;
}

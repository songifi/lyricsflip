import { Repository } from 'typeorm';
import { Tournament } from './tournament.entity';
import { Player } from '../player/player.entity';
import { GameSession } from 'src/game-session/game-session.entity';
import { SchedulingService } from './scheduling.service';
export declare class TournamentService {
    private tournamentRepository;
    private playerRepository;
    private gameSessionRepository;
    private schedulingService;
    constructor(tournamentRepository: Repository<Tournament>, playerRepository: Repository<Player>, gameSessionRepository: Repository<GameSession>, schedulingService: SchedulingService);
    createTournament(name: string, startTime: Date, endTime: Date, rules: Record<string, any>, participantIds: string[]): Promise<Tournament>;
    scheduleMatches(tournamentId: string): Promise<GameSession[]>;
    applyScoring(tournamentId: string): Promise<void>;
    private applyMatchScoringRules;
}

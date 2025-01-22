import { LeaderboardService } from './providers/leaderboard.service';
export declare class LeaderboardController {
    private readonly leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    getLeaderboard(): void;
    getPlayerRank(): void;
}

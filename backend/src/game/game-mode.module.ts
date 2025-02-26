import { Module } from '@nestjs/common';
import { ClassicModeService } from './game-modes/classic-mode.service';
import { TimeAttackModeService } from './game-modes/time-attack-mode.service';
import { EndlessModeService } from './game-modes/endless-mode.service';
import { BattleRoyaleModeService } from './game-modes/battle-royale-mode.service';
import { ClassicScoringStrategy } from './strategies/scoring/classic-scoring.strategy';
import { TimeAttackScoringStrategy } from './strategies/scoring/time-attack-scoring.strategy';
import { EndlessScoringStrategy } from './strategies/scoring/endless-scoring.strategy';
import { BattleRoyaleScoringStrategy } from './strategies/scoring/battle-royale-scoring.strategy';
import { GameModeService } from '../interfaces/game-mode.service';
import { GameSessionService } from '../interfaces/game-session.service';
import { GameModeController } from '../interfaces/game-mode.controller';
import { MatchmakingService } from '../interfaces/matchmaking.service';
import { GameStatsService } from '../interfaces/game-stats.service';

@Module({
  providers: [
    // Scoring strategies
    ClassicScoringStrategy,
    TimeAttackScoringStrategy,
    EndlessScoringStrategy,
    BattleRoyaleScoringStrategy,
    
    // Game modes
    ClassicModeService,
    TimeAttackModeService,
    EndlessModeService,
    BattleRoyaleModeService,
    
    // Services
    GameModeService,
    GameSessionService,
    MatchmakingService,
    GameStatsService,
  ],
  controllers: [GameModeController],
  exports: [
    GameModeService,
    GameSessionService,
    MatchmakingService,
    GameStatsService,
  ],
})
export class GameModeModule {}

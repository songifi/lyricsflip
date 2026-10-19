import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../redis/redis.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { GameState } from './entities/game-state.entity';
import { StateAudit } from './entities/state-audit.entity';
import { ChainRound } from '../indexer/entities/chain-round.entity';
import { ChainRoundResult } from '../indexer/entities/chain-round-result.entity';
import { ChainRoundPlayer } from '../indexer/entities/chain-round-player.entity';
import { IndexerState } from '../indexer/entities/indexer-state.entity';
import { StateRecoveryController } from './controllers/state-recovery.controller';
import { StateRecoveryService } from './services/state-recovery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GameState,
      StateAudit,
      ChainRound,
      ChainRoundResult,
      ChainRoundPlayer,
      IndexerState,
    ]),
    RedisModule,
    LeaderboardModule,
  ],
  controllers: [StateRecoveryController],
  providers: [StateRecoveryService, Logger],
  exports: [StateRecoveryService],
})
export class StateRecoveryModule {}
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { IndexerService } from './services/indexer.service';
import { IndexerGateway } from './gateways/indexer.gateway';
import { IndexerMetrics } from './services/indexer.metrics';
import { RoundKeeperService } from './services/round-keeper.service';
import { IndexerState } from './entities/indexer-state.entity';
import { ChainRound } from './entities/chain-round.entity';
import { ChainRoundPlayer } from './entities/chain-round-player.entity';
import { ChainAnswer } from './entities/chain-answer.entity';
import { ChainRoundResult } from './entities/chain-round-result.entity';
import { ChainNft } from './entities/chain-nft.entity';
import { ProcessedEvent } from './entities/processed-event.entity';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { StateRecoveryModule } from './state-recovery/state-recovery.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([
      IndexerState,
      ChainRound,
      ChainRoundPlayer,
      ChainAnswer,
      ChainRoundResult,
      ChainNft,
      ProcessedEvent,
    ]),
    forwardRef(() => LeaderboardModule),
    forwardRef(() => StateRecoveryModule),
  ],
  providers: [
    IndexerService,
    IndexerGateway,
    IndexerMetrics,
    RoundKeeperService,
  ],
  exports: [IndexerService, IndexerMetrics],
})
export class IndexerModule {}
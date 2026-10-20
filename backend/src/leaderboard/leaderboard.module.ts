import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './providers/leaderboard.service';
import { LeaderboardRoundResult } from './entities/leaderboard-round-result.entity';
import { ChainRoundResult } from '../chain-indexer/entities/chain-round-result.entity';
import { ChainRound } from '../chain-indexer/entities/chain-round.entity';
import { ChainNft } from '../chain-indexer/entities/chain-nft.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeaderboardRoundResult,
      ChainRoundResult,
      ChainRound,
      ChainNft,
    ]),
    RedisModule,
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
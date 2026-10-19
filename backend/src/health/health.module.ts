import { Module, forwardRef } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './redis.health';
import { StellarRpcHealthIndicator } from './stellar-rpc.health';
import { IndexerHealthIndicator } from './indexer.health';
import { IndexerModule } from '../indexer/indexer.module';

@Module({
  imports: [TerminusModule, forwardRef(() => IndexerModule)],
  controllers: [HealthController],
  providers: [RedisHealthIndicator, StellarRpcHealthIndicator, IndexerHealthIndicator],
})
export class HealthModule {}
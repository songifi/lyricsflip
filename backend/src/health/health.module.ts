import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './redis.health';
import { StellarRpcHealthIndicator } from './stellar-rpc.health';
import { IndexerLagHealthIndicator } from './indexer-lag.health';

@Module({
  imports: [TerminusModule, TypeOrmModule.forFeature([])],
  controllers: [HealthController],
  providers: [
    RedisHealthIndicator,
    StellarRpcHealthIndicator,
    IndexerLagHealthIndicator,
  ],
})
export class HealthModule {}
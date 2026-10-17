import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../redis/redis.module';
import { GameState } from './entities/game-state.entity';
import { StateAudit } from './entities/state-audit.entity';
import { StateRecoveryController } from './controllers/state-recovery.controller';
import { StateRecoveryService } from './services/state-recovery.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameState, StateAudit]), RedisModule],
  controllers: [StateRecoveryController],
  providers: [StateRecoveryService, Logger],
  exports: [StateRecoveryService],
})
export class StateRecoveryModule {}

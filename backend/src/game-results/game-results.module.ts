
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GameResultsController } from './game-results.controller';
import { GameResultsService } from './game-results.service';
import { GameResult } from './entities/game-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameResult]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [GameResultsController],
  providers: [GameResultsService],
  exports: [GameResultsService],
})
export class GameResultsModule {}

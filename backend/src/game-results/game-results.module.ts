import { Module } from '@nestjs/common';
import { GameResultsService } from './game-results.service';
import { GameResultsController } from './game-results.controller';

@Module({
  controllers: [GameResultsController],
  providers: [GameResultsService],
})
export class GameResultsModule {}

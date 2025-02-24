import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScoringService } from './scoring.service';
import { ScoringController } from './scoring.controller';
import { Scoring } from './entities/scoring.entity';
import { Player } from 'src/player/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Scoring]), 
    EventEmitterModule.forRoot(),
  ],
  controllers: [ScoringController], 
  providers: [ScoringService],
  exports: [ScoringService],
})
export class ScoringModule {}

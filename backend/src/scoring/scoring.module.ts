import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScoringService } from './scoring.service';
import { Player } from 'src/player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), EventEmitterModule.forRoot()],
  providers: [ScoringService],
  exports: [ScoringService],
})
export class ScoringModule {}

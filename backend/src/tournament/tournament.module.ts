import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentService } from './tournament.service';
import { Tournament } from './tournament.entity';
import { User } from '../user/user.entity';
import { GameSession } from '../game-session/game-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, User, GameSession])],
  providers: [TournamentService],
  exports: [TournamentService],
})
export class TournamentModule {}

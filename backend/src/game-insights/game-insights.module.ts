import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameInsightsService } from './provider/game-insights/game-insights.service';
import { GameInsightsController } from './game-insights.controller';
import { GameSession } from './GameSession.entity';
import { UserBehavior } from './UserBehavior';
import { PlayerPerformance } from './PlayerPerformance';

@Module({
  imports: [TypeOrmModule.forFeature([GameSession, PlayerPerformance, UserBehavior])],
  controllers: [GameInsightsController],
  providers: [GameInsightsService],
})
export class GameInsightsModule {}

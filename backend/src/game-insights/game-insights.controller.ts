import { Controller, Post, Body } from '@nestjs/common';
import { GameInsightsService } from './provider/game-insights/game-insights.service';
import { CreateGameSessionDto } from './DTO/CreateGameSessionDto';
import { CreatePlayerPerformanceDto } from './DTO/CreatePlayerPerformanceDto';
import { CreateUserBehaviorDto } from './DTO/CreateUserBehaviorDto';

@Controller('game-insights')
export class GameInsightsController {
  constructor(private readonly gameInsightsService: GameInsightsService) {}

  @Post('/session')
  trackGameSession(@Body() data: CreateGameSessionDto) {
    return this.gameInsightsService.trackGameSession(data);
  }

  @Post('/performance')
  trackPlayerPerformance(@Body() data: CreatePlayerPerformanceDto) {
    return this.gameInsightsService.trackPlayerPerformance(data);
  }

  @Post('/behavior')
  trackUserBehavior(@Body() data: CreateUserBehaviorDto) {
    return this.gameInsightsService.trackUserBehavior(data);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameSession } from 'src/game-session/game-session.entity';
import { PlayerPerformance } from 'src/game-insights/PlayerPerformance';
import { UserBehavior } from 'src/game-insights/UserBehavior';
import { CreateGameSessionDto } from 'src/game-insights/DTO/CreateGameSessionDto';
import { CreatePlayerPerformanceDto } from 'src/game-insights/DTO/CreatePlayerPerformanceDto';
import { CreateUserBehaviorDto } from 'src/game-insights/DTO/CreateUserBehaviorDto';

@Injectable()
export class GameInsightsService {
  constructor(
    @InjectRepository(GameSession)
    private gameSessionRepo: Repository<GameSession>,
    
    @InjectRepository(PlayerPerformance)
    private playerPerformanceRepo: Repository<PlayerPerformance>,
    
    @InjectRepository(UserBehavior)
    private userBehaviorRepo: Repository<UserBehavior>,
  ) {}

  async trackGameSession(data: CreateGameSessionDto) {
    return await this.gameSessionRepo.save(data);
  }

  async trackPlayerPerformance(data: CreatePlayerPerformanceDto) {
    return await this.playerPerformanceRepo.save(data);
  }

  async trackUserBehavior(data: CreateUserBehaviorDto) {
    return await this.userBehaviorRepo.save(data);
  }
}

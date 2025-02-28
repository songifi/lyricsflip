import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GameResult } from './entities/game-result.entity';
import { CreateGameResultDto } from './dto/game-result.dto';
import { LeaderboardEntryDto } from './dto/leaderboard-entry.dto';
import { GameResultCreatedEvent } from './events/game-result.event';

@Injectable()
export class GameResultsService {
  private readonly logger = new Logger(GameResultsService.name);

  constructor(
    @InjectRepository(GameResult)
    private gameResultsRepository: Repository<GameResult>,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Calculate final score based on game data, time spent, and any other factors
   */
  calculateFinalScore(gameData: any, timeSpent: number): number {
    // Implement your scoring algorithm based on your game's logic
    // Example: Base score from game + time bonus + achievement bonus
    let finalScore = gameData.baseScore || 0;
    
    // Time bonus (example: faster completion = higher bonus)
    const timeBonus = Math.max(1000 - timeSpent, 0) * 0.1;
    finalScore += timeBonus;
    
    // Achievement bonus
    if (gameData.achievements && Array.isArray(gameData.achievements)) {
      const achievementBonus = gameData.achievements.length * 50;
      finalScore += achievementBonus;
    }
    
    // Round to integer
    return Math.round(finalScore);
  }

  /**
   * Create and store a new game result
   */
  async createResult(createGameResultDto: CreateGameResultDto): Promise<GameResult> {
    // Calculate final score if not provided
    if (!createGameResultDto.score) {
      createGameResultDto.score = this.calculateFinalScore(
        createGameResultDto.gameData,
        createGameResultDto.timeSpent,
      );
    }
    
    // Create and save the entity
    const gameResult = this.gameResultsRepository.create(createGameResultDto);
    const savedResult = await this.gameResultsRepository.save(gameResult);
    
    // Emit event for other parts of the system
    this.eventEmitter.emit(
      'game.result.created',
      new GameResultCreatedEvent(
        savedResult.userId,
        savedResult.gameId,
        savedResult.score,
        savedResult.achievements || [],
      ),
    );
    
    this.logger.log(`Game result created for user ${savedResult.userId} with score ${savedResult.score}`);
    
    return savedResult;
  }

  /**
   * Generate a leaderboard for a specific game
   */
  async generateLeaderboard(gameId: string, limit = 10): Promise<LeaderboardEntryDto[]> {
    // Get top scores for the specified game
    const results = await this.gameResultsRepository.find({
      where: { gameId },
      order: { score: 'DESC' },
      take: limit,
    });
    
    // Transform into leaderboard entries with ranks
    const leaderboard = await Promise.all(
      results.map(async (result, index) => {
        // In a real app, you might want to fetch username from a user service
        // This is a simplified example
        const username = `User_${result.userId.substring(0, 6)}`;
        
        const entry: LeaderboardEntryDto = {
          userId: result.userId,
          username,
          score: result.score,
          rank: index + 1,
          achievements: result.achievements || [],
          gameId: result.gameId,
        };
        
        return entry;
      }),
    );
    
    return leaderboard;
  }

  /**
   * Get user's personal best for a specific game
   */
  async getUserBest(userId: string, gameId: string): Promise<GameResult | null> {
    return this.gameResultsRepository.findOne({
      where: { userId, gameId },
      order: { score: 'DESC' },
    });
  }

  /**
   * Get all results for a specific user
   */
  async getUserResults(userId: string): Promise<GameResult[]> {
    return this.gameResultsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
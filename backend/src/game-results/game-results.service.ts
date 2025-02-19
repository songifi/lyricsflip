import { Injectable } from '@nestjs/common';
import { CreateGameResultDto } from './dto/create-game-result.dto';
import { UpdateGameResultDto } from './dto/update-game-result.dto';
import { GameSession } from 'src/game-session/game-session.entity';

@Injectable()
export class GameResultsService {
  getLeaderboard(arg0: { timeframe: "daily" | "weekly" | "monthly" | "all-time"; page: number; limit: number; }) {
    throw new Error('Method not implemented.');
  }
  getGameStats(gameId: string) {
    throw new Error('Method not implemented.');
  }
  getPlayerResults(userId: string, arg1: { page: number; limit: number; }) {
    throw new Error('Method not implemented.');
  }
  processGameResult(gameSession: GameSession) {
    throw new Error('Method not implemented.');
  }
  create(createGameResultDto: CreateGameResultDto) {
    return 'This action adds a new gameResult';
  }

  findAll() {
    return `This action returns all gameResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameResult`;
  }

  update(id: number, updateGameResultDto: UpdateGameResultDto) {
    return `This action updates a #${id} gameResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameResult`;
  }
}

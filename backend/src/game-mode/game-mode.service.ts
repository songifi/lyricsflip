import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { GameModeDto } from './dto/create-game-mode.dto';
import { GameMode } from './entities/game-mode.entity';


@Injectable()
export class GameModeService {
  constructor(
    @InjectRepository(GameMode)
    private gameModeRepository: Repository<GameMode>
  ) {}

  async createGameMode(data: GameModeDto, user: User) {
    const gameMode = this.gameModeRepository.create({ ...data, creator: user });
    return this.gameModeRepository.save(gameMode);
  }

  async getAllGameModes() {
    return this.gameModeRepository.find({ relations: ['creator'] });
  }

  async upvoteGameMode(id: string) {
    return this.gameModeRepository.increment({ id }, 'votes', 1);
  }
}
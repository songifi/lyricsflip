import { Controller, Get, Post, Body, Request} from '@nestjs/common';
import { GameModeService } from './game-mode.service';
import { GameModeDto } from './dto/create-game-mode.dto';

@Controller('game-mode')
export class GameModeController {
  constructor(private readonly gameModeService: GameModeService) {}

  @Post()
  async createGameMode(@Body() data: GameModeDto, @Request() req) {
    return this.gameModeService.createGameMode(data, req.user);
  }

  @Get()
  async getAllGameModes() {
    return this.gameModeService.getAllGameModes();
  }
}

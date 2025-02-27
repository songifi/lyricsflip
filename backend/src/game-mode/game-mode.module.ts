import { Module } from '@nestjs/common';
import { GameModeService } from './game-mode.service';
import { GameModeController } from './game-mode.controller';

@Module({
  controllers: [GameModeController],
  providers: [GameModeService],
})
export class GameModeModule {}

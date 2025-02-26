import { PartialType } from '@nestjs/swagger';
import { CreateGameModeDto } from './create-game-mode.dto';

export class UpdateGameModeDto extends PartialType(CreateGameModeDto) {}

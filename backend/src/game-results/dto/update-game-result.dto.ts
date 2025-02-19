import { PartialType } from '@nestjs/swagger';
import { CreateGameResultDto } from './create-game-result.dto';

export class UpdateGameResultDto extends PartialType(CreateGameResultDto) {}

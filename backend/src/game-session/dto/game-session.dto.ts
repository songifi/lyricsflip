export class CreateGameSessionDto {}
import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsDate,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { GameStatus } from '../enums/game-status.enum';

export class GameSessionDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;

  @IsEnum(GameStatus)
  @IsNotEmpty()
  status: GameStatus;

  @IsInt()
  maxPlayers: number;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsString()
  description: string;
}

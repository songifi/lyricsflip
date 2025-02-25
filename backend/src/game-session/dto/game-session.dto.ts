import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GameStatus } from '../enums/game-status.enum';

export class GameSessionDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsISO8601()
  @IsNotEmpty()
  @Type(() => Date)
  startTime: Date;

  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  endTime?: Date;

  @IsEnum(GameStatus)
  @IsNotEmpty()
  status: GameStatus;

  @IsInt()
  @IsNotEmpty()
  maxPlayers: number;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

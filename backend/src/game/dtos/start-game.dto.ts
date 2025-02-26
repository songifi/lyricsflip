// src/game/dtos/start-game.dto.ts
import { IsString, IsArray, ArrayMinSize, IsOptional, IsNumber } from 'class-validator';

export class StartGameDto {
  @IsString()
  modeId: string;
  
  @IsArray()
  @ArrayMinSize(1)
  playerIds: string[];
  
  @IsOptional()
  @IsNumber()
  difficulty?: number;
  
  @IsOptional()
  @IsNumber()
  timeLimit?: number;
}
// src/progression/dtos/xp-event.dto.ts
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum XpSource {
  GAME_WIN = 'GAME_WIN',
  ACHIEVEMENT = 'ACHIEVEMENT',
  QUEST = 'QUEST',
  DAILY_BONUS = 'DAILY_BONUS',
}

export class XpEventDto {
  @IsString()
  userId: string;

  @IsNumber()
  amount: number;

  @IsEnum(XpSource)
  source: XpSource;

  @IsOptional()
  @IsString()
  metadata?: string;
}
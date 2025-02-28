import { IsString, IsNumber } from 'class-validator';

export class CreatePlayerPerformanceDto {
  @IsString()
  playerId: string;

  @IsString()
  gameTitle: string;

  @IsNumber()
  score: number;

  @IsNumber()
  accuracy: number;

  @IsNumber()
  responseTime: number;
}

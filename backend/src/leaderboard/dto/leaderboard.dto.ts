import {
  IsUUID,
  IsInt,
  IsNumber,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';

export class LeaderboardDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  playerId: string;

  @IsInt()
  @IsNotEmpty()
  rank: number;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsISO8601()
  @IsNotEmpty()
  createdAt: string;

  @IsISO8601()
  @IsNotEmpty()
  updatedAt: string;
}

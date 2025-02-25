import { IsUUID, IsInt, IsNumber, IsDate } from "class-validator";

export class LeaderboardDto {
  @IsUUID()
  id: string;

  @IsUUID()
  playerId: string;

  @IsInt()
  rank: number;

  @IsNumber()
  score: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

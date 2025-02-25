export class CreateGameSessionDto {}
import { IsUUID, IsOptional, IsString, IsInt, IsEnum, IsDate, IsNumber } from "class-validator";

export class GameSessionDto {
  @IsUUID()
  id: string;

  @IsDate()
  startTime: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;

  @IsEnum(["active", "completed", "canceled"])
  status: string;

  @IsInt()
  maxPlayers: number;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  metadata?: Record<string, any>;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  description: string;
}

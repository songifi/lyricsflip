import { IsString, IsDate } from 'class-validator';

export class CreateGameSessionDto {
  @IsString()
  playerId: string;

  @IsString()
  gameTitle: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime?: Date;
}

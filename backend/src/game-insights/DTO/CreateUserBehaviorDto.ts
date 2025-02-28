import { IsString } from 'class-validator';

export class CreateUserBehaviorDto {
  @IsString()
  playerId: string;

  @IsString()
  gameTitle: string;

  @IsString()
  actionType: string;

  @IsString()
  genrePreference: string;
}

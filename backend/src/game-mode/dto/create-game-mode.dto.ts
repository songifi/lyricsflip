import { IsString, IsBoolean, IsObject, IsNotEmpty } from 'class-validator';

export class GameModeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  rules: {
    timeLimit: number;
    pointSystem: Record<string, number>;
    powerUpsAllowed: string[];
    minimumPlayers: number;
    specialConditions: string[];
  };

  @IsBoolean()
  isPublic: boolean;
}
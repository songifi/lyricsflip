import { IsString, IsInt, Min, IsObject, IsNotEmpty } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(0)
  points: number;

  @IsObject()
  @IsNotEmpty()
  criteria: Record<string, any>;
}

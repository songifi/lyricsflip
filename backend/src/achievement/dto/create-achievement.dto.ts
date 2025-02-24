// src/achievement/dto/create-achievement.dto.ts
import { IsString, IsEnum, IsNumber, IsObject, IsNotEmpty } from 'class-validator';
import { AchievementCategory } from '../entities/achievement.entity';

export class CreateAchievementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  icon: string;

  @IsEnum(AchievementCategory)
  category: AchievementCategory;

  @IsNumber()
  pointsValue: number;

  @IsObject()
  criteria: Record<string, any>;
}
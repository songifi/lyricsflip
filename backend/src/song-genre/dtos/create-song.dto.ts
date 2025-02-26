import { IsString, IsNumber, IsObject, IsUUID, IsArray, IsOptional } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsNumber()
  durationSeconds: number;

  @IsNumber()
  baseDifficulty: number;

  @IsObject()
  difficultyFactors: Record<string, number>;

  @IsUUID()
  genreId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagIds?: string[];
}
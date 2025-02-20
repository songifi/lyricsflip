import { IsNotEmpty, IsString, IsNumber, IsArray, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  artist: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lyrics: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(10)
  difficulty: number;

  @ApiProperty()
  @IsNumber()
  @Min(1900)
  releaseYear: number;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tags: string[];
}


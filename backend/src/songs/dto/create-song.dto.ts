import { IsNotEmpty, IsString, IsNumber, IsArray, Min, Max, IsOptional, IsUUID } from 'class-validator';
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
  @IsNotEmpty()
  @IsUUID()
  difficultyId: string;

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


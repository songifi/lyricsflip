// src/questions/dto/create-question.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsArray, Min, Max, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  songId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lyricSnippet: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  options: string[];

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(3)
  correctAnswer: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(10)
  difficulty: number;

  @ApiProperty()
  @IsNumber()
  @Min(10)
  @Max(60)
  timeLimit: number;
}

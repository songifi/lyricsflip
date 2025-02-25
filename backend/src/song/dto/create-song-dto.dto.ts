import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  album?: string;

  // Duration in seconds; must be at least 1 second.
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration: number;
}

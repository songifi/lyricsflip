import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';

export class CreateActivityItemDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

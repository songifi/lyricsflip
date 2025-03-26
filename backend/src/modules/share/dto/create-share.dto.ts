import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ShareType } from '../enums/share-type.enum';
import { PlatformType } from '../enums/platform-type.enum';

export class CreateShareDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(ShareType)
  type: ShareType;

  @IsNotEmpty()
  @IsString()
  contentId: string;

  @IsNotEmpty()
  @IsString()
  contentType: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsEnum(PlatformType)
  platform?: PlatformType;
}

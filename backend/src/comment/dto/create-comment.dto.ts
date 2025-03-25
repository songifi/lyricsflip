import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  contentType: string;

  @IsNotEmpty()
  @IsUUID()
  contentId: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}

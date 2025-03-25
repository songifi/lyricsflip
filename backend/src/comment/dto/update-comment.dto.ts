import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

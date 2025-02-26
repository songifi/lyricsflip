// src/practice/dto/submit-result.dto.ts
import { IsNumber, IsObject, Min } from 'class-validator';

export class SubmitResultDto {
  @IsObject()
  userResponse: Record<string, any>;

  @IsNumber()
  @Min(0)
  timeSpentSeconds: number;
}

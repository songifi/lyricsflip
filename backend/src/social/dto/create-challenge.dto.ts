// dto/create-challenge.dto.ts
import { IsString, IsArray, IsDate, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChallengeDto {
  @IsString()
  type: ChallengeType;

  @IsArray()
  @IsString({ each: true })
  participants: string[];

  @IsDate()
  @Type(() => Date)
  deadline: Date;

  @ValidateNested()
  @Type(() => RewardDto)
  reward: RewardDto;
}
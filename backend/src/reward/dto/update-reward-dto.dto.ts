import { PartialType } from '@nestjs/mapped-types';
import { CreateRewardDto } from './create-reward-dto.dto';

export class UpdateRewardDto extends PartialType(CreateRewardDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateWagerDto } from './create-wager-dto.dto';

export class UpdateWagerDto extends PartialType(CreateWagerDto) {}

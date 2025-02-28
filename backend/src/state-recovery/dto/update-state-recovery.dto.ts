import { PartialType } from '@nestjs/swagger';
import { CreateStateRecoveryDto } from './create-state-recovery.dto';

export class UpdateStateRecoveryDto extends PartialType(CreateStateRecoveryDto) {}

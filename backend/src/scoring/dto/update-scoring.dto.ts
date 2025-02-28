import { PartialType } from '@nestjs/swagger';
import { CreateScoringDto } from './create-scoring.dto';

export class UpdateScoringDto extends PartialType(CreateScoringDto) {}

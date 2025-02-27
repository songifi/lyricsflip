// src/practice/dto/update-practice-item.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePracticeItemDto } from './create-practice-item.dto';

export class UpdatePracticeItemDto extends PartialType(CreatePracticeItemDto) {}

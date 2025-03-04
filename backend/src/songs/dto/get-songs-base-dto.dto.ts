import { IsDate, IsOptional } from 'class-validator';

import { IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query-dto.dto';

class GetSongsBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetSongsDto extends IntersectionType(
  GetSongsBaseDto,
  PaginationQueryDto,
) {}

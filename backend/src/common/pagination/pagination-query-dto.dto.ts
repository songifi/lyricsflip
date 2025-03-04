import { IsOptional, IsPositive } from 'class-validator';

import { Type } from 'class-transformer';

export class PaginationQueryDto {
  // @Type(() => Number) //coverting strings to numbers
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}

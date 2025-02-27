import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty } from "class-validator"
import { Type } from "class-transformer"

export class DateRangeDto {
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date
}


import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsObject, IsOptional } from "class-validator"

export class AnalyticsResponseDto {
  @ApiProperty()
  @IsDate()
  timestamp: Date

  @ApiProperty()
  @IsObject()
  data: Record<string, any>

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>
}


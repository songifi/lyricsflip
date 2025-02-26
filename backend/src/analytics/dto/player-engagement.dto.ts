import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsDate, IsArray } from "class-validator"

export class PlayerEngagementDto {
  @ApiProperty()
  @IsNumber()
  totalSessions: number

  @ApiProperty()
  @IsNumber()
  activeUsers: number

  @ApiProperty()
  @IsNumber()
  averageSessionDuration: number

  @ApiProperty()
  @IsNumber()
  retentionRate: number

  @ApiProperty({ type: [Number] })
  @IsArray()
  peakActivityHours: number[]

  @ApiProperty()
  @IsDate()
  timestamp: Date
}


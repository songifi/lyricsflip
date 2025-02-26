import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsObject } from "class-validator"

export class AggregatedAnalyticsDto {
  @ApiProperty()
  @IsDate()
  timestamp: Date

  @ApiProperty()
  @IsObject()
  playerEngagement: Record<string, any>

  @ApiProperty()
  @IsObject()
  songCategories: Record<string, any>

  @ApiProperty()
  @IsObject()
  tokenEconomy: Record<string, any>

  @ApiProperty()
  @IsObject()
  userProgression: Record<string, any>

  @ApiProperty()
  @IsObject()
  summary: {
    totalActiveUsers: number
    topCategory: string
    tokenCirculation: number
    averageUserLevel: number
    timestamp: Date
  }
}


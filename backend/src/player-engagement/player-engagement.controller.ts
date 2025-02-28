import { Controller, Get, Query } from "@nestjs/common";
import { PlayerEngagementService } from "src/player-engagement/player-engagement.service";
import { DateRangeDto } from "src/analytics/dto/date-range.dto";
import { PlayerEngagementDto } from "./dto/player-engagement.dto";

@Controller("player-engagement")
export class PlayerEngagementController {
  constructor(private readonly playerEngagementService: PlayerEngagementService) {}

  @Get("metrics")
  async getMetrics(@Query() dateRange: DateRangeDto): Promise<PlayerEngagementDto> {
    return this.playerEngagementService.getMetrics(dateRange);
  }

  @Get("retention")
  async getRetentionMetrics(@Query() dateRange: DateRangeDto): Promise<{ retentionRates: number[]; totalUsers: number }> {
    return this.playerEngagementService.getRetentionMetrics(dateRange);
  }
}

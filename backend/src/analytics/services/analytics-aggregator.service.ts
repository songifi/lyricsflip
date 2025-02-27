import { Injectable, Logger } from "@nestjs/common"
import type { PlayerEngagementService } from "./player-engagement.service"
import type { SongAnalyticsService } from "./song-analytics.service"
import type { TokenAnalyticsService } from "./token-analytics.service"
import type { UserProgressionService } from "./user-progression.service"
import type { DateRangeDto } from "../dto/date-range.dto"
import type { AggregatedAnalyticsDto } from "../dto/aggregated-analytics.dto"

@Injectable()
export class AnalyticsAggregatorService {
  private readonly logger = new Logger(AnalyticsAggregatorService.name)

  constructor(
    private readonly playerEngagementService: PlayerEngagementService,
    private readonly songAnalyticsService: SongAnalyticsService,
    private readonly tokenAnalyticsService: TokenAnalyticsService,
    private readonly userProgressionService: UserProgressionService,
  ) {}

  async getAggregatedData(dateRange: DateRangeDto): Promise<AggregatedAnalyticsDto> {
    try {
      const [playerEngagement, songCategories, tokenEconomy, userProgression] = await Promise.all([
        this.playerEngagementService.getMetrics(dateRange),
        this.songAnalyticsService.getPopularCategories(dateRange),
        this.tokenAnalyticsService.getStatistics(dateRange),
        this.userProgressionService.getTrends(dateRange),
      ])

      return {
        timestamp: new Date(),
        playerEngagement,
        songCategories,
        tokenEconomy,
        userProgression,
        summary: this.generateSummary({
          playerEngagement,
          songCategories,
          tokenEconomy,
          userProgression,
        }),
      }
    } catch (error) {
      this.logger.error(`Error aggregating analytics data: ${error.message}`)
      throw error
    }
  }

  private generateSummary(data: any) {
    // Implement summary logic based on all metrics
    return {
      totalActiveUsers: data.playerEngagement.activeUsers,
      topCategory: data.songCategories[0]?.name || "N/A",
      tokenCirculation: data.tokenEconomy.totalCirculation,
      averageUserLevel: data.userProgression.averageLevel,
      timestamp: new Date(),
    }
  }
}


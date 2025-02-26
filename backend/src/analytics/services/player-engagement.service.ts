import { Injectable, Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { PlayerEngagementMetric } from "../entities/player-engagement.entity"
import type { DateRangeDto } from "../dto/date-range.dto"
import type { PlayerEngagementDto } from "../dto/player-engagement.dto"

@Injectable()
export class PlayerEngagementService {
  private readonly logger = new Logger(PlayerEngagementService.name);

  constructor(
    @InjectRepository(PlayerEngagementMetric)
    private readonly repository: Repository<PlayerEngagementMetric>,
  ) {}

  async getMetrics(dateRange: DateRangeDto): Promise<PlayerEngagementDto> {
    try {
      const metrics = await this.repository
        .createQueryBuilder("engagement")
        .where("engagement.timestamp BETWEEN :startDate AND :endDate", {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })
        .getMany()

      return this.processMetrics(metrics)
    } catch (error) {
      this.logger.error(`Error fetching player engagement metrics: ${error.message}`)
      throw error
    }
  }

  private processMetrics(metrics: PlayerEngagementMetric[]): PlayerEngagementDto {
    const totalSessions = metrics.reduce((sum, metric) => sum + metric.sessionCount, 0)
    const activeUsers = new Set(metrics.map((metric) => metric.userId)).size
    const averageSessionDuration = metrics.reduce((sum, metric) => sum + metric.sessionDuration, 0) / metrics.length

    return {
      totalSessions,
      activeUsers,
      averageSessionDuration,
      retentionRate: this.calculateRetentionRate(metrics),
      peakActivityHours: this.calculatePeakHours(metrics),
      timestamp: new Date(),
    }
  }

  private calculateRetentionRate(metrics: PlayerEngagementMetric[]): number {
    // Implement retention rate calculation logic
    return 0
  }

  private calculatePeakHours(metrics: PlayerEngagementMetric[]): number[] {
    // Implement peak hours calculation logic
    return []
  }
}


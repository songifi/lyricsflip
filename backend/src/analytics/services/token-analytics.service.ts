import { Injectable, Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { TokenMetric } from "../entities/token.entity"
import type { DateRangeDto } from "../dto/date-range.dto"

@Injectable()
export class TokenAnalyticsService {
  private readonly logger = new Logger(TokenAnalyticsService.name);

  constructor(
    @InjectRepository(TokenMetric)
    private readonly repository: Repository<TokenMetric>,
  ) {}

  async getStatistics(dateRange: DateRangeDto) {
    try {
      const metrics = await this.repository
        .createQueryBuilder("token")
        .where("token.timestamp BETWEEN :startDate AND :endDate", {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })
        .orderBy("token.timestamp", "ASC")
        .getMany()

      return this.processTokenMetrics(metrics)
    } catch (error) {
      this.logger.error(`Error fetching token metrics: ${error.message}`)
      throw error
    }
  }

  private processTokenMetrics(metrics: TokenMetric[]) {
    if (!metrics.length) {
      return {
        totalSupply: 0,
        circulation: 0,
        transactions: 0,
        averageHolding: 0,
        distribution: {},
        trends: {
          supply: [],
          transactions: [],
        },
        timestamp: new Date(),
      }
    }

    const latest = metrics[metrics.length - 1]
    const trends = metrics.reduce(
      (acc, metric) => {
        acc.supply.push({
          timestamp: metric.timestamp,
          value: metric.totalSupply,
        })
        acc.transactions.push({
          timestamp: metric.timestamp,
          value: metric.transactions,
        })
        return acc
      },
      { supply: [], transactions: [] },
    )

    return {
      totalSupply: latest.totalSupply,
      circulation: latest.circulation,
      transactions: latest.transactions,
      averageHolding: latest.averageHolding,
      distribution: latest.distributionData,
      trends,
      timestamp: new Date(),
    }
  }
}


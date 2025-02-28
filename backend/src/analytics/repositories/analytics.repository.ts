import { Injectable } from "@nestjs/common"
import type { Repository } from "typeorm"
import { PlayerEngagementMetric } from "../entities/player-engagement.entity"
import { SongCategoryMetric } from "../entities/song-category.entity"
import { TokenMetric } from "../entities/token.entity"
import { UserProgressionMetric } from "../entities/user-progression.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class AnalyticsRepository {
  constructor(
    @InjectRepository(PlayerEngagementMetric)
    private playerEngagementRepo: Repository<PlayerEngagementMetric>,
    @InjectRepository(SongCategoryMetric)
    private songCategoryRepo: Repository<SongCategoryMetric>,
    @InjectRepository(TokenMetric)
    private tokenRepo: Repository<TokenMetric>,
    @InjectRepository(UserProgressionMetric)
    private userProgressionRepo: Repository<UserProgressionMetric>,
  ) {}

  async getPlayerEngagementMetrics(startDate: Date, endDate: Date) {
    return this.playerEngagementRepo
      .createQueryBuilder("engagement")
      .where("engagement.timestamp BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getMany()
  }

  async getSongCategoryMetrics(startDate: Date, endDate: Date) {
    return this.songCategoryRepo
      .createQueryBuilder("category")
      .where("category.timestamp BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getMany()
  }

  async getTokenMetrics(startDate: Date, endDate: Date) {
    return this.tokenRepo
      .createQueryBuilder("token")
      .where("token.timestamp BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getMany()
  }

  async getUserProgressionMetrics(startDate: Date, endDate: Date) {
    return this.userProgressionRepo
      .createQueryBuilder("progression")
      .where("progression.timestamp BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .getMany()
  }
}


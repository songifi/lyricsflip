// src/achievement/achievement.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { AchievementGateway } from './achievement.gateway';
import { Achievement } from './entities/achievement.entity';
import { UserAchievement } from './entities/user-achievement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achievement, UserAchievement]),
  ],
  controllers: [AchievementController],
  providers: [AchievementService, AchievementGateway],
  exports: [AchievementService],
})
export class AchievementModule {}
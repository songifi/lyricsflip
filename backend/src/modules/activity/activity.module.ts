import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './activity.service';
import { ActivityItem } from './entities/activity-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityItem])],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}

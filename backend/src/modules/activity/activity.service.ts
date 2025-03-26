import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityItem } from './entities/activity-item.entity';
import { CreateActivityItemDto } from './dto/create-activity-item.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityItem)
    private activityRepository: Repository<ActivityItem>,
  ) {}

  async addItem(createActivityItemDto: CreateActivityItemDto): Promise<ActivityItem> {
    const activityItem = this.activityRepository.create({
      ...createActivityItemDto,
      timestamp: new Date(),
    });
    return this.activityRepository.save(activityItem);
  }

  async getUserFeed(userId: string, limit: number = 20): Promise<ActivityItem[]> {
    return this.activityRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }
}

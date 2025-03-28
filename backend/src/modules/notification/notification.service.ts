import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      createdAt: new Date(),
      isRead: false,
    });
    return this.notificationRepository.save(notification);
  }

  async sendToFollowers(userId: string, notification: CreateNotificationDto): Promise<void> {
    // In a real implementation, you would:
    // 1. Get all followers of the user
    // 2. Create a notification for each follower
    // For now, we'll just create a single notification
    await this.createNotification(notification);
  }

  async sendToUser(userId: string, notification: CreateNotificationDto): Promise<void> {
    await this.createNotification({
      ...notification,
      userId,
    });
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: {
        userId,
        isRead: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}

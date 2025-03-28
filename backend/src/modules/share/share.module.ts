import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { ShareNotificationService } from './share-notification.service';
import { Share } from './entities/share.entity';
import { ShareAnalytics } from './entities/share-analytics.entity';
import { NotificationModule } from '../notification/notification.module';
import { ActivityModule } from '../activity/activity.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Share, ShareAnalytics]),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    NotificationModule,
    ActivityModule,
    AuthModule,
  ],
  controllers: [ShareController],
  providers: [ShareService, ShareNotificationService],
  exports: [ShareService],
})
export class ShareModule {}

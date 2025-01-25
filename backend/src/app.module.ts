import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GameSessionModule } from './game-session/game-session.module';
import { SongModule } from './song/song.module';
import { WagerModule } from './wager/wager.module';
import { RewardModule } from './reward/reward.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { NotificationModule } from './notification/notification.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GameSessionModule,
    SongModule,
    WagerModule,
    RewardModule,
    LeaderboardModule,
    NotificationModule,
    AdminModule,
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

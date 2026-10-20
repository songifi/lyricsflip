import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SongsModule } from './songs/songs.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { ScoringModule } from './scoring/scoring.module';
import { QuestionsModule } from './questions/questions.module';
import { QuickGameModule } from './quick-game/quick-game.module';
import { GameModule } from './game/game.module';
import { AchievementModule } from './achievement/achievement.module';
import { RoomModule } from './room/room.module';
import { SocialModule } from './social/social.module';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { redisStore } from 'cache-manager-redis-yet';
import { ThrottlerModule } from '@nestjs/throttler';
import { Redis } from 'ioredis';
import { RedisThrottlerStorage } from './common/throttler/redis-throttler.storage';
import { DEFAULT_THROTTLE } from './common/throttler/throttle-limits';
import { PaginationModule } from './common/pagination/pagination.module';
import { IndexerModule } from './indexer/indexer.module';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { StorageModule } from './storage/storage.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SearchModule } from './search/search.module';
import { ModerationModule } from './moderation/moderation.module';
import { AdminModule } from './admin/admin.module';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    DatabaseModule,
    RedisModule,
    StorageModule,
    AuthModule,
    UsersModule,
    GameSessionModule,
    WagerModule,
    RewardModule,
    LeaderboardModule,
    NotificationModule,
    LoggerModule,
    GameModule,
    PaginationModule,
    EventEmitterModule.forRoot(),
    // Global limit for general reads; /auth/* and answer submission apply
    // stricter per-route limits (see common/throttler/throttle-limits.ts).
    // Redis-backed storage keeps counts consistent across instances. Window
    // and limit come from configuration.ts (RATE_LIMIT_TTL/RATE_LIMIT_LIMIT),
    // falling back to DEFAULT_THROTTLE's values when unset.
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'default',
            ttl: config.get<number>('rateLimit.ttl') ?? DEFAULT_THROTTLE.ttl,
            limit:
              config.get<number>('rateLimit.limit') ?? DEFAULT_THROTTLE.limit,
          },
        ],
        storage: new RedisThrottlerStorage(
          new Redis(config.get<string>('redis.url') ?? 'redis://127.0.0.1:6379'),
        ),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      // Schema changes go through migrations (see `database/data-source.ts`
      // and `npm run migration:*`) in every environment, staging and
      // production included — `synchronize` is unsafe outside a scratch DB
      // and doesn't version schema changes.
      synchronize: false,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: process.env.DB_MIGRATIONS_RUN !== 'false',
    }),
    QuestionsModule,
    QuickGameModule,
    // cache-manager-redis-yet targets the cache-manager v5 API (unlike
    // cache-manager-redis-store@3, which silently fails on v5). The Redis
    // connection is described by the single `redis.url` setting, shared with
    // the throttler storage above.
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (config: ConfigService) => ({
        store: await redisStore({
          url: config.get<string>('redis.url') ?? 'redis://127.0.0.1:6379',
          ttl: 3600,
        }),
      }),
    }),
    SongsModule,
    PlaylistsModule,
    SearchModule,
    NotificationsModule,
    AnalyticsModule,
    ModerationModule,
    AdminModule,
    ScoringModule,
    AchievementModule,
    SocialModule,
    RoomModule,
    IndexerModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

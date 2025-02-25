import { Module, } from '@nestjs/common';
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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { GlobalInterceptor } from './interceptors/global.interceptor';
import { SongsModule } from './songs/songs.module';
import { ScoringModule } from './scoring/scoring.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { PowerUpModule } from './power-ups/power-up.module';
import { TournamentService } from './tournament/tournament.service';
import { TournamentModule } from './tournament/tournament.module';
import { GameGateway } from './websocket-game comms/providers/gamegateway';
import { GameModule } from './websocket-game comms/game.module';
import { AchievementModule } from './achievement/achievement.module';
import { SongGenreModule } from './song-genre/song-genre.module';
import { SocialModule } from './social/social.module';
// import { AchievementModule } from './achievement/achievement.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

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
    ConfigModule,
    GameModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    CacheModule.register({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
      ttl: 3600, 
    }),
    SongsModule,
    ChatRoomModule,
    ScoringModule,
    PowerUpModule,
    TournamentModule,
    AchievementModule,
    SocialModule,
    SongGenreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
    TournamentService,
    GameGateway,
  ],
})
export class AppModule {}

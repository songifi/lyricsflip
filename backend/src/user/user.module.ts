import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from './../auth/auth.module';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { CreateUserProvider } from './providers/create-user.services';
import { HashingProvider } from './providers/hashing.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@app/auth/authConfig/jwt.config';
import { UpdateProfileProvider } from './providers/update-profile.provider';
import { FindPublicProfileProvider } from './providers/find-public-profile.provider';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './providers/player.service';

@Module({
  controllers: [UserController, PlayerController],
  providers: [
    UserService,
    FindOneUserByEmailProvider,
    CreateUserProvider,
    HashingProvider,
    UpdateProfileProvider,
    FindPublicProfileProvider,
    PlayerService,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => LeaderboardModule),
  ],
  exports: [UserService, FindOneUserByEmailProvider],
})
export class UserModule {}
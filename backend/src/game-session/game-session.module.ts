import { Module } from '@nestjs/common';
import { GameSessionController } from './game-session.controller';
import { GameSessionService } from './providers/game-session.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/authConfig/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [GameSessionController],
  providers: [GameSessionService],
})
export class GameSessionModule {}

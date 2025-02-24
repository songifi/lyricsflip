import { Module, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from './../user/user.module';
import { SignInProvider } from './providers/sign-in.provider';
import { BcryptProvider } from './providers/bcrypt-provider';
import { GenerateTokensProvider } from './providers/generate-tokens-provider';
import { HashingProvider } from './providers/hashing-provider';
// import { createRoutesFromChildren } from 'react-router-dom';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './authConfig/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './guard/access-token/access-token.guard';
import { PasswordResetProvider } from './providers/password-reset.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInProvider,
    {
      provide: HashingProvider, //abstract class
      useClass: BcryptProvider, // implementation
    },
    PasswordResetProvider,
    AccessTokenGuard,
    Reflector, 
    GenerateTokensProvider,
  ],
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProvider, AccessTokenGuard],
})
export class AuthModule {}

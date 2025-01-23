import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { SignInProvider } from './providers/sign-in.provider';
import { BcryptProvider } from './providers/bcrypt-provider';
import { GenerateTokensProvider } from './providers/generate-tokens-provider';
import { HashingProvider } from './providers/hashing-provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInProvider,
    { 
      provide: HashingProvider, //abstract class 
      useClass: BcryptProvider  // implementation
    },
    GenerateTokensProvider,
  ],
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService],
})
export class AuthModule {}

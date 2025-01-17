import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SignInProvider],
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService],
})
export class AuthModule {}

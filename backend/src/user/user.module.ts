import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, FindOneUserByEmailProvider],
  imports: [forwardRef(() => AuthModule)],
  exports: [UserService, FindOneUserByEmailProvider],
})
export class UserModule {}

import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { CreateUserProvider } from './providers/create-user.services';
import { HashingProvider } from './providers/hashing.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    FindOneUserByEmailProvider,
    CreateUserProvider,
    HashingProvider,
  ],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UserService, FindOneUserByEmailProvider],
})
export class UserModule {}

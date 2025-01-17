import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    //Inject findoneuserbyemailprovider
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async findUserByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }
}

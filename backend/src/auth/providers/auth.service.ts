import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/user/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  public login(email: string, password: string) {
    //Check if the user exists in the database
    const user = this.userService.findOne(email);
    // your login logic

    // Token
    return 'SAMPLE TOKEN';
  }

  public isAuth() {
    return true;
  }
}

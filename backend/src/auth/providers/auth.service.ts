/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/user/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public login(email: string, password: string) {
    //Check if the user exists in the database
    const user = this.userService.findOneBy({email});
    // your login logic

    // Token
    return 'SAMPLE TOKEN';
  }

  public isAuth() {
    return true;
  }
}

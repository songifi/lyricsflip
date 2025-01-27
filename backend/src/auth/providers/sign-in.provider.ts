import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './../../user/providers/user.service';
import { HashingProvider } from './hashing-provider';
import { GenerateTokensProvider } from './generate-tokens-provider';
import { SignInDto } from '../dtos/signIn.dto';

@Injectable()
export class SignInProvider {
  constructor(
    /*
     * injecting userService repo
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /*
     * injecting hashing dependency
     */
    private readonly hashingProvider: HashingProvider,

    /*
     * injecting generateTokenProvider
     */
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}
  public async SignIn(signInDto: SignInDto) {
    // check if user exist in db
    // throw error if user doesnt exist
    let user = await this.userService.findUserByEmail(signInDto.email);

    // conpare password
    let isCheckedPassword: boolean = false;

    try {
      isCheckedPassword = await this.hashingProvider.comparePasswords(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'error  connecting to the database',
      });
    }

    if (!isCheckedPassword) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    // login
    return await this.generateTokenProvider.generateTokens(user);
  }
}

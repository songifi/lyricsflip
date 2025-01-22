import { UserService } from 'src/user/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    signIn(signInDto: SignInDto): void;
}

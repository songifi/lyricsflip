import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { UserDTO } from './../user/dtos/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<void>;
    createUser(userDTO: UserDTO): Promise<import("../user/user.entity").User[]>;
}

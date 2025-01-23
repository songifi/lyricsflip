import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { UserDTO } from 'src/user/dtos/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<void>;
<<<<<<< HEAD
    createUser(userDTO: UserDTO): Promise<import("../user/user.entity").User[]>;
=======
    createUser(userDTO: UserDTO): Promise<(import("../user/user.entity").User & import("../user/user.entity").User[])[]>;
>>>>>>> 818061761b261076822681dd1ca861393938e264
}

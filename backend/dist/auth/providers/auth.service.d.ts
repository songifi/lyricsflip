import { UserService } from 'src/user/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
import { UserDTO } from 'src/user/dtos/create-user.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    signIn(signInDto: SignInDto): void;
<<<<<<< HEAD
    signUp(userDto: UserDTO): Promise<import("../../user/user.entity").User[]>;
=======
    signUp(userDto: UserDTO): Promise<(import("../../user/user.entity").User & import("../../user/user.entity").User[])[]>;
>>>>>>> 818061761b261076822681dd1ca861393938e264
}

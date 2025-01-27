import { UserService } from './../../user/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
import { UserDTO } from './../../user/dtos/create-user.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    signIn(signInDto: SignInDto): void;
    signUp(userDto: UserDTO): Promise<import("../../user/user.entity").User[]>;
}

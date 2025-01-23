import { UserService } from 'src/user/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
import { UserDTO } from 'src/user/dtos/create-user.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    signIn(signInDto: SignInDto): void;
    signUp(userDto: UserDTO): Promise<(import("../../user/user.entity").User & import("../../user/user.entity").User[])[]>;
}

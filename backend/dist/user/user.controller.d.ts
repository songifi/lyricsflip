import { UserService } from './providers/user.service';
import { UserDTO } from './dtos/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(userDto: UserDTO): Promise<import("./user.entity").User[]>;
    signIn(): string;
    refreshToken(): string;
    updateProfile(): string;
}

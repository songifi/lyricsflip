import { UserService } from './providers/user.service';
import { UserDTO } from './dtos/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
<<<<<<< HEAD
    signUp(userDto: UserDTO): Promise<import("./user.entity").User[]>;
=======
    signUp(): void;
>>>>>>> 818061761b261076822681dd1ca861393938e264
    signIn(): string;
    refreshToken(): string;
    updateProfile(): string;
}

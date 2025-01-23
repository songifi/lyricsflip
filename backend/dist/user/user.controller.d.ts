import { UserService } from './providers/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(): void;
    signIn(): string;
    refreshToken(): string;
    updateProfile(): string;
}

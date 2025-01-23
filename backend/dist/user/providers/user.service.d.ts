import { AuthService } from 'src/auth/providers/auth.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.services';
import { UserDTO } from '../dtos/create-user.dto';
export declare class UserService {
    private readonly authService;
    private readonly findOneUserByEmailProvider;
    private readonly createUserProvider;
    constructor(authService: AuthService, findOneUserByEmailProvider: FindOneUserByEmailProvider, createUserProvider: CreateUserProvider);
    findUserByEmail(email: string): Promise<import("../user.entity").User>;
    signUp(userDto: UserDTO): Promise<import("../user.entity").User[]>;
    signIn(): string;
    refreshToken(): string;
    updateProfile(): string;
}

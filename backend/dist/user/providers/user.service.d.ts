import { AuthService } from 'src/auth/providers/auth.service';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
export declare class UserService {
    private readonly authService;
    private readonly findOneUserByEmailProvider;
    constructor(authService: AuthService, findOneUserByEmailProvider: FindOneUserByEmailProvider);
    findUserByEmail(email: string): Promise<any>;
    signUp(): string;
    signIn(): string;
    refreshToken(): string;
    updateProfile(): string;
}

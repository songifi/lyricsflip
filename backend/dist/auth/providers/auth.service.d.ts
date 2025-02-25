import { UserService } from './../../user/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
import { UserDTO } from './../../user/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { PasswordResetProvider } from './password-reset.provider';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly passwordResetProvider;
    constructor(userService: UserService, jwtService: JwtService, passwordResetProvider: PasswordResetProvider);
    signIn(signInDto: SignInDto): void;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    signUp(userDto: UserDTO): Promise<import("../../user/user.entity").User[]>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
}

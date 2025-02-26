import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../authConfig/jwt.config';
import { UserService } from '../../user/providers/user.service';
import { HashingProvider } from './hashing-provider';
export declare class PasswordResetProvider {
    private readonly jwtService;
    private readonly jwtConfiguration;
    private readonly userService;
    private readonly hashingProvider;
    constructor(jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>, userService: UserService, hashingProvider: HashingProvider);
    generateResetToken(userId: string): Promise<string>;
    sendResetEmail(email: string, token: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}

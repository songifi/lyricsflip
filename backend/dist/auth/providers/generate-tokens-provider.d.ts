import { JwtService } from "@nestjs/jwt";
import { UserService } from "./../../user/providers/user.service";
import jwtConfig from "../authConfig/jwt.config";
import { ConfigType } from "@nestjs/config";
import { User } from "./../../user/user.entity";
export declare class GenerateTokensProvider {
    private readonly userService;
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(userService: UserService, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signToken<T>(userId: string, expiresIn: number, payload?: T): Promise<string>;
    generateTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
}

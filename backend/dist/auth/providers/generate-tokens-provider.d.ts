import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/providers/user.service";
import jwtConfig from "../authConfig/jwt.config";
import { ConfigType } from "@nestjs/config";
export declare class GenerateTokensProvider {
    private readonly userService;
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(userService: UserService, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signToken<T>(userId: number, expiresIn: number, payload?: T): Promise<string>;
    generateTokens(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
}

import { JwtService } from "@nestjs/jwt";
import { UserService } from "./../../user/providers/user.service";
import jwtConfig from "../authConfig/jwt.config";
import { ConfigType } from "@nestjs/config";
import { GenerateTokensProvider } from "./generate-tokens-provider";
import { RefreshTokenDto } from "../dtos/refresh-token.dto";
export declare class RefreshTokensProvider {
    private readonly userService;
    private readonly jwtService;
    private readonly jwtConfiguration;
    private readonly generateTokenProvider;
    constructor(userService: UserService, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>, generateTokenProvider: GenerateTokensProvider);
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("../../user/user.entity").User;
    }>;
}

import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "./../../user/providers/user.service"
import jwtConfig from "../authConfig/jwt.config"
import { ConfigType } from "@nestjs/config"
import { GenerateTokensProvider } from "./generate-tokens-provider"
import { RefreshTokenDto } from "../dtos/refresh-token.dto"

@Injectable()
export class RefreshTokensProvider {
  constructor(
    /*
     * injecting userService repo
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /*
     * inject jwtService
     */
    private readonly jwtService: JwtService,

    /*
     * inject jwtService
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /* 
     * inject generateTokenProvider
     */
    private readonly generateTokenProvider: GenerateTokensProvider
  ) {}
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    // validate the refresh token using jwt
   const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken, 
        {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
    })

    // grab the user from the database
    const user = await this.userService.FindOneById(sub)

    // generate the token
    return await this.generateTokenProvider.generateTokens(user)
  }
}
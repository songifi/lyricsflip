import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./../../user/providers/user.service";
import jwtConfig from "../authConfig/jwt.config";
import { ConfigType } from "@nestjs/config";
import { User } from "./../../user/user.entity";
// import { User } from "./../../user/user.entity";

@Injectable()
export class GenerateTokensProvider {
  constructor(
    /*
     * injecting userService repo
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /*
     *injecting jwtService
     */
    private readonly jwtService: JwtService,

    /*
     * injecting jwtConfig
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
    // generate access token
    this.signToken(user.id, this.jwtConfiguration.ttl, {email: user.email}),

    // generate refresh token
    this.signToken(user.id, this.jwtConfiguration.ttl)
    ])
    
    return {'accessToken': accessToken, 'refreshToken': refreshToken, user}
  }
}
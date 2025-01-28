import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/authConfig/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constant/auth-constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    // jwt service
    private readonly jwtService: JwtService,

    // jwt config injcetion
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Extract the request from the execution context
    const request = context.switchToHttp().getRequest();
    // Extract the token from the header
    const token = this.extractRequestFromHeader(request);
    // Validate the token
    if (!token) {
      throw new UnauthorizedException('User does not exist');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException('User not authorized');
    }

    return true;
  }

  private extractRequestFromHeader(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}

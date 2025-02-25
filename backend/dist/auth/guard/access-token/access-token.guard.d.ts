import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/authConfig/jwt.config';
import { Reflector } from '@nestjs/core';
export declare class AccessTokenGuard implements CanActivate {
    private readonly jwtService;
    private readonly jwtConfiguration;
    private readonly reflector;
    constructor(jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractRequestFromHeader;
}

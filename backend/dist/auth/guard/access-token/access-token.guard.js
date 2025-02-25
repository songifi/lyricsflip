"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../authConfig/jwt.config");
const auth_constant_1 = require("../../constant/auth-constant");
const public_decorator_1 = require("../../decorators/public.decorator");
const core_1 = require("@nestjs/core");
let AccessTokenGuard = class AccessTokenGuard {
    constructor(jwtService, jwtConfiguration, reflector) {
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const token = this.extractRequestFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('User does not exist');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);
            request[auth_constant_1.REQUEST_USER_KEY] = payload;
            console.log(payload);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('User not authorized');
        }
        return true;
    }
    extractRequestFromHeader(request) {
        const [_, token] = request.headers.authorization?.split(' ') ?? [];
        return token;
    }
};
exports.AccessTokenGuard = AccessTokenGuard;
exports.AccessTokenGuard = AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [jwt_1.JwtService, void 0, core_1.Reflector])
], AccessTokenGuard);
//# sourceMappingURL=access-token.guard.js.map
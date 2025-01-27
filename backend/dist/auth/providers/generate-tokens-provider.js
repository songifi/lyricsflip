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
exports.GenerateTokensProvider = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./../../user/providers/user.service");
const jwt_config_1 = require("../authConfig/jwt.config");
let GenerateTokensProvider = class GenerateTokensProvider {
    constructor(userService, jwtService, jwtConfiguration) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
    }
    async signToken(userId, expiresIn, payload) {
        return await this.jwtService.signAsync({
            sub: userId,
            ...payload,
        }, {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            expiresIn,
        });
    }
    async generateTokens(user) {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken(user.id, this.jwtConfiguration.ttl, { email: user.email }),
            this.signToken(user.id, this.jwtConfiguration.ttl)
        ]);
        return { 'accessToken': accessToken, 'refreshToken': refreshToken, user };
    }
};
exports.GenerateTokensProvider = GenerateTokensProvider;
exports.GenerateTokensProvider = GenerateTokensProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService, void 0])
], GenerateTokensProvider);
//# sourceMappingURL=generate-tokens-provider.js.map
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
exports.PasswordResetProvider = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../authConfig/jwt.config");
const user_service_1 = require("../../user/providers/user.service");
const hashing_provider_1 = require("./hashing-provider");
let PasswordResetProvider = class PasswordResetProvider {
    constructor(jwtService, jwtConfiguration, userService, hashingProvider) {
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
        this.userService = userService;
        this.hashingProvider = hashingProvider;
    }
    async generateResetToken(userId) {
        return this.jwtService.signAsync({ sub: userId }, {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            expiresIn: '15m',
        });
    }
    async sendResetEmail(email, token) {
        console.log(`Password reset token for ${email}: ${token}`);
    }
    async resetPassword(token, newPassword) {
        const { sub } = await this.jwtService.verifyAsync(token, {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
        });
        const hashedPassword = await this.hashingProvider.hashPassword(newPassword);
        await this.userService.updateUserPassword(sub, hashedPassword);
    }
};
exports.PasswordResetProvider = PasswordResetProvider;
exports.PasswordResetProvider = PasswordResetProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [jwt_1.JwtService, void 0, user_service_1.UserService,
        hashing_provider_1.HashingProvider])
], PasswordResetProvider);
//# sourceMappingURL=password-reset.provider.js.map
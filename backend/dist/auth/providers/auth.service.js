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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./../../user/providers/user.service");
const jwt_1 = require("@nestjs/jwt");
const password_reset_provider_1 = require("./password-reset.provider");
let AuthService = class AuthService {
    constructor(userService, jwtService, passwordResetProvider) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordResetProvider = passwordResetProvider;
    }
    signIn(signInDto) {
    }
    async forgotPassword(email) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const resetToken = await this.passwordResetProvider.generateResetToken(user.id);
        await this.passwordResetProvider.sendResetEmail(email, resetToken);
    }
    async resetPassword(token, newPassword) {
        await this.passwordResetProvider.resetPassword(token, newPassword);
    }
    async signUp(userDto) {
        return await this.userService.signUp(userDto);
    }
    async refreshToken(refreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.userService.FindOneById(decoded.userId);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const newAccessToken = this.jwtService.sign({ userId: user.id, email: user.email }, { secret: process.env.JWT_SECRET, expiresIn: '15m' });
            return { accessToken: newAccessToken };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        password_reset_provider_1.PasswordResetProvider])
], AuthService);
//# sourceMappingURL=auth.service.js.map
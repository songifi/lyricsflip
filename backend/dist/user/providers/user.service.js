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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/providers/auth.service");
const find_one_user_by_email_provider_1 = require("./find-one-user-by-email.provider");
let UserService = class UserService {
    constructor(authService, findOneUserByEmailProvider) {
        this.authService = authService;
        this.findOneUserByEmailProvider = findOneUserByEmailProvider;
    }
    async findUserByEmail(email) {
        return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
    }
    signUp() {
        return 'userService: Sign-up logic placeholder';
    }
    signIn() {
        return 'userService: Sign-in logic placeholder';
    }
    refreshToken() {
        return 'userService: Refresh token logic placeholder';
    }
    updateProfile() {
        return 'userService: Update profile logic placeholder';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        find_one_user_by_email_provider_1.FindOneUserByEmailProvider])
], UserService);
//# sourceMappingURL=user.service.js.map
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
exports.SignInProvider = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./../../user/providers/user.service");
const hashing_provider_1 = require("./hashing-provider");
const generate_tokens_provider_1 = require("./generate-tokens-provider");
let SignInProvider = class SignInProvider {
    constructor(userService, hashingProvider, generateTokenProvider) {
        this.userService = userService;
        this.hashingProvider = hashingProvider;
        this.generateTokenProvider = generateTokenProvider;
    }
    async SignIn(signInDto) {
        let user = await this.userService.findUserByEmail(signInDto.email);
        let isCheckedPassword = false;
        try {
            isCheckedPassword = await this.hashingProvider.comparePasswords(signInDto.password, user.password);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException(error, {
                description: 'error  connecting to the database',
            });
        }
        if (!isCheckedPassword) {
            throw new common_1.UnauthorizedException('email or password is incorrect');
        }
        return await this.generateTokenProvider.generateTokens(user);
    }
};
exports.SignInProvider = SignInProvider;
exports.SignInProvider = SignInProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        hashing_provider_1.HashingProvider,
        generate_tokens_provider_1.GenerateTokensProvider])
], SignInProvider);
//# sourceMappingURL=sign-in.provider.js.map
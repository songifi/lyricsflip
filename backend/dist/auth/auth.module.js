"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./providers/auth.service");
const user_module_1 = require("./../user/user.module");
const sign_in_provider_1 = require("./providers/sign-in.provider");
const bcrypt_provider_1 = require("./providers/bcrypt-provider");
const generate_tokens_provider_1 = require("./providers/generate-tokens-provider");
const hashing_provider_1 = require("./providers/hashing-provider");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("./authConfig/jwt.config");
const jwt_1 = require("@nestjs/jwt");
const access_token_guard_1 = require("./guard/access-token/access-token.guard");
const password_reset_provider_1 = require("./providers/password-reset.provider");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            sign_in_provider_1.SignInProvider,
            {
                provide: hashing_provider_1.HashingProvider,
                useClass: bcrypt_provider_1.BcryptProvider,
            },
            password_reset_provider_1.PasswordResetProvider,
            access_token_guard_1.AccessTokenGuard,
            core_1.Reflector,
            generate_tokens_provider_1.GenerateTokensProvider,
        ],
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
        ],
        exports: [auth_service_1.AuthService, hashing_provider_1.HashingProvider, access_token_guard_1.AccessTokenGuard],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
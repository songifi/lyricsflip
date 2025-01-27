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
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./providers/auth.service");
const user_module_1 = require("./../user/user.module");
const sign_in_provider_1 = require("./providers/sign-in.provider");
const bcrypt_provider_1 = require("./providers/bcrypt-provider");
const generate_tokens_provider_1 = require("./providers/generate-tokens-provider");
const hashing_provider_1 = require("./providers/hashing-provider");
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
            generate_tokens_provider_1.GenerateTokensProvider,
        ],
        imports: [(0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        exports: [auth_service_1.AuthService, hashing_provider_1.HashingProvider],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
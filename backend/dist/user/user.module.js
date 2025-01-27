"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./providers/user.service");
const auth_module_1 = require("./../auth/auth.module");
const find_one_user_by_email_provider_1 = require("./providers/find-one-user-by-email.provider");
const create_user_services_1 = require("./providers/create-user.services");
const hashing_provider_1 = require("./providers/hashing.provider");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            find_one_user_by_email_provider_1.FindOneUserByEmailProvider,
            create_user_services_1.CreateUserProvider,
            hashing_provider_1.HashingProvider,
        ],
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), (0, common_1.forwardRef)(() => auth_module_1.AuthModule)],
        exports: [user_service_1.UserService, find_one_user_by_email_provider_1.FindOneUserByEmailProvider],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map
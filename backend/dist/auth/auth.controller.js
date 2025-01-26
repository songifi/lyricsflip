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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./providers/auth.service");
const signIn_dto_1 = require("./dtos/signIn.dto");
const create_user_dto_1 = require("./../user/dtos/create-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    async createUser(userDTO) {
        return await this.authService.signUp(userDTO);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign in a user',
        description: 'Authenticates a user and returns an access token if the credentials are valid.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User signed in successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials.' }),
    (0, swagger_1.ApiBody)({
        description: 'Login credentials including email and password.',
        type: signIn_dto_1.SignInDto,
        examples: {
            example: {
                summary: 'Valid login credentials',
                value: {
                    email: 'user@example.com',
                    password: 'password123',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign up a new user',
        description: 'Registers a new user and returns the user details upon successful registration.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User registered successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid user input data.' }),
    (0, swagger_1.ApiBody)({
        description: 'User details required for registration.',
        type: create_user_dto_1.UserDTO,
        examples: {
            example: {
                summary: 'Valid user details',
                value: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    password: 'securePassword123',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
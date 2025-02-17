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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./providers/user.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    signUp(userDto) {
        return this.userService.signUp(userDto);
    }
    signIn() {
        return this.userService.signIn();
    }
    refreshToken() {
        return this.userService.refreshToken();
    }
    updateProfile() {
        return this.userService.updateProfile();
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign up a new user',
        description: 'Create a new user account'
    }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.UserDTO }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully created'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign in a user',
        description: 'Authenticate user credentials'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully signed in'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid credentials'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh user access token',
        description: 'Generate a new access token using refresh token'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Access token successfully refreshed'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid refresh token'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user profile',
        description: 'Modify user profile information'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile successfully updated'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid profile data'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
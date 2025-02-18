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
const access_token_guard_1 = require("../auth/guard/access-token/access-token.guard");
<<<<<<< HEAD
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
=======
>>>>>>> c658da9e73156dd12a469e16aa11262be3f80820
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
    getAdminData() {
        return 'this returns admin roles ';
    }
    getAdminById(id) {
        return 'this returns single admin by his ID ';
    }
    getAllAdmins() {
        return 'this returns all admins  ';
    }
    updateAdminById(id, userDto) {
        return 'this updates an  admin ';
    }
    deleteAdminById(id) {
        return 'this deletes an admin ';
    }
    getPlayerData() {
        return 'this returns player specific roles ';
    }
    getPlayerById(id) {
        return 'this returns a single player ';
    }
    getAllPlayers() {
        return 'this returns all players ';
    }
    updatePlayerById(id, userDto) {
        return 'this edits a single player ';
    }
    deletePlayerById(id) {
        return 'this deletes a player ';
    }
    getViewerData() {
        return 'this returns  all viewers ';
    }
    getUserById(id) {
        return 'this returns  a single user ';
    }
    getAllUsers() {
        return 'this returns  all users ';
    }
    updateUserById(id, userDto) {
        return 'this updates a users ';
    }
    deleteUserById(id) {
        return 'this deletes a single users ';
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
        description: 'Create a new user account',
    }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.UserDTO }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully created',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input',
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
        description: 'Authenticate user credentials',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully signed in',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid credentials',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)('refresh-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh user access token',
        description: 'Generate a new access token using refresh token',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Access token successfully refreshed',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid refresh token',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "refreshToken", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAdminData", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAdminById", null);
__decorate([
    (0, common_1.Get)('admins'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllAdmins", null);
__decorate([
    (0, common_1.Put)('admin/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateAdminById", null);
__decorate([
    (0, common_1.Delete)('admin/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteAdminById", null);
__decorate([
    (0, common_1.Get)('player'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.PLAYER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getPlayerData", null);
__decorate([
    (0, common_1.Get)('player/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.PLAYER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getPlayerById", null);
__decorate([
    (0, common_1.Get)('players'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.PLAYER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllPlayers", null);
__decorate([
    (0, common_1.Put)('player/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.PLAYER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePlayerById", null);
__decorate([
    (0, common_1.Delete)('player/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.PLAYER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deletePlayerById", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getViewerData", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)('user/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)('user/:id'),
    (0, roles_decorator_1.Roles)(role_enum_1.UserRole.USER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUserById", null);
__decorate([
=======
>>>>>>> c658da9e73156dd12a469e16aa11262be3f80820
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user profile',
        description: 'Modify user profile information',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile successfully updated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid profile data',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
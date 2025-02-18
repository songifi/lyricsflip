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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./providers/admin.service");
const create_admin_dto_1 = require("./dtos/create-admin.dto");
const access_token_guard_1 = require("../auth/guard/access-token/access-token.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    signUp(adminDto) {
        return this.adminService.signUp(adminDto);
    }
    getPlatformStats() {
        return this.adminService.getPlatformStats();
    }
    manageUsers() {
        return this.adminService.manageUsers();
    }
    addSong() {
        return this.adminService.addSong();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign up a new admin',
        description: 'Create a new admin account',
    }),
    (0, swagger_1.ApiBody)({ type: create_admin_dto_1.AdminDTO }),
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
    __metadata("design:paramtypes", [create_admin_dto_1.AdminDTO]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve platform statistics',
        description: 'Fetch key statistics and metrics for the platform.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Platform statistics retrieved successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getPlatformStats", null);
__decorate([
    (0, common_1.Post)('users/manage'),
    (0, swagger_1.ApiOperation)({
        summary: 'Manage user accounts and permissions',
        description: 'Perform operations to manage user accounts, including updating roles, permissions, and statuses.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User accounts managed successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data provided.' }),
    (0, swagger_1.ApiBody)({
        description: 'Details for managing users, such as user IDs and permissions.',
        schema: {
            example: {
                userId: '12345',
                action: 'update-role',
                role: 'admin',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "manageUsers", null);
__decorate([
    (0, common_1.Post)('songs/add'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add a new song to the platform',
        description: 'Create a new song entry with metadata such as title, artist, and album.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'New song added successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid song data provided.' }),
    (0, swagger_1.ApiBody)({
        description: 'Details of the song to add, including title, artist, and album.',
        schema: {
            example: {
                title: 'New Song',
                artist: 'Artist Name',
                album: 'Album Name',
                duration: 210,
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addSong", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map
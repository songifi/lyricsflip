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
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const friend_service_1 = require("../services/friend.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    async sendFriendRequest(userId, receiverId) {
        return this.friendService.sendFriendRequest(userId, receiverId);
    }
    async acceptFriendRequest(userId, requestId) {
        return this.friendService.acceptFriendRequest(userId, requestId);
    }
    async getFriends(userId) {
        return this.friendService.getFriends(userId);
    }
};
exports.FriendController = FriendController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)('request/:requestId/accept'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "getFriends", null);
exports.FriendController = FriendController = __decorate([
    (0, common_1.Controller)('friends'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [friend_service_1.FriendService])
], FriendController);
//# sourceMappingURL=friend.controller.js.map
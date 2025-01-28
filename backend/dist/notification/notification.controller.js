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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("./providers/notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    getNotifications() {
        return this.notificationService.getNotifications();
    }
    markNotificationsRead() {
        return this.notificationService.markNotificationsRead();
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get notifications',
        description: 'Retrieve all user notifications'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Notifications successfully retrieved'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Post)('mark-read'),
    (0, swagger_1.ApiOperation)({
        summary: 'Mark notifications as read',
        description: 'Mark all user notifications as read'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Notifications successfully marked as read'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "markNotificationsRead", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('notification'),
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map
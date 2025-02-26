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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const ws_jwt_auth_guard_1 = require("../guards/ws-jwt-auth.guard");
let NotificationGateway = class NotificationGateway {
    constructor() {
        this.userSockets = new Map();
    }
    async handleConnection(client) {
        const userId = client.data.user.id;
        this.userSockets.set(userId, client);
    }
    handleDisconnect(client) {
        const userId = client.data.user.id;
        this.userSockets.delete(userId);
    }
    async sendNotification(userId, notification) {
        const socket = this.userSockets.get(userId);
        if (socket) {
            socket.emit('notification', notification);
        }
    }
    async handleMarkRead(client, notificationId) {
        const userId = client.data.user.id;
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('markRead'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "handleMarkRead", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard)
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map
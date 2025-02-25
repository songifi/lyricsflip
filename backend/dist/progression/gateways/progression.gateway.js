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
exports.ProgressionGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const event_emitter_1 = require("@nestjs/event-emitter");
let ProgressionGateway = class ProgressionGateway {
    handleXpAdded(payload) {
        this.server.to(payload.userId).emit('xpGained', payload);
    }
    handleLevelUp(payload) {
        this.server.to(payload.userId).emit('levelUp', payload);
    }
    handleRankChange(payload) {
        this.server.to(payload.userId).emit('rankChanged', payload);
    }
};
exports.ProgressionGateway = ProgressionGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ProgressionGateway.prototype, "server", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)('progression.xp.added'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProgressionGateway.prototype, "handleXpAdded", null);
__decorate([
    (0, event_emitter_1.OnEvent)('progression.level.up'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProgressionGateway.prototype, "handleLevelUp", null);
__decorate([
    (0, event_emitter_1.OnEvent)('progression.rank.changed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProgressionGateway.prototype, "handleRankChange", null);
exports.ProgressionGateway = ProgressionGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], ProgressionGateway);
//# sourceMappingURL=progression.gateway.js.map
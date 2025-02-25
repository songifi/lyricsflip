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
exports.ChatRoom = void 0;
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../player/player.entity");
let ChatRoom = class ChatRoom {
};
exports.ChatRoom = ChatRoom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChatRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatRoom.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChatRoom.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChatRoom.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => player_entity_1.Player, player => player.chatRoom),
    __metadata("design:type", Array)
], ChatRoom.prototype, "players", void 0);
exports.ChatRoom = ChatRoom = __decorate([
    (0, typeorm_1.Entity)('chat_rooms')
], ChatRoom);
//# sourceMappingURL=chat-room.entity.js.map
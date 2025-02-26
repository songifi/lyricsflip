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
exports.ChatRoomController = void 0;
const common_1 = require("@nestjs/common");
const chat_room_service_1 = require("./chat-room.service");
const create_chat_room_dto_1 = require("./dto/create-chat-room.dto");
const update_chat_room_dto_1 = require("./dto/update-chat-room.dto");
let ChatRoomController = class ChatRoomController {
    constructor(chatRoomService) {
        this.chatRoomService = chatRoomService;
    }
    create(createChatRoomDto) {
        return this.chatRoomService.create(createChatRoomDto);
    }
    findAll() {
        return this.chatRoomService.findAll();
    }
    findOne(id) {
        return this.chatRoomService.findOne(+id);
    }
    update(id, updateChatRoomDto) {
        return this.chatRoomService.update(+id, updateChatRoomDto);
    }
    remove(id) {
        return this.chatRoomService.remove(+id);
    }
};
exports.ChatRoomController = ChatRoomController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_room_dto_1.CreateChatRoomDto]),
    __metadata("design:returntype", void 0)
], ChatRoomController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatRoomController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatRoomController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_chat_room_dto_1.UpdateChatRoomDto]),
    __metadata("design:returntype", void 0)
], ChatRoomController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatRoomController.prototype, "remove", null);
exports.ChatRoomController = ChatRoomController = __decorate([
    (0, common_1.Controller)('chat-room'),
    __metadata("design:paramtypes", [chat_room_service_1.ChatRoomService])
], ChatRoomController);
//# sourceMappingURL=chat-room.controller.js.map
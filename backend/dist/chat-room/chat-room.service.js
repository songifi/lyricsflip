"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomService = void 0;
const common_1 = require("@nestjs/common");
let ChatRoomService = class ChatRoomService {
    create(createChatRoomDto) {
        return 'This action adds a new chatRoom';
    }
    findAll() {
        return `This action returns all chatRoom`;
    }
    findOne(id) {
        return `This action returns a #${id} chatRoom`;
    }
    update(id, updateChatRoomDto) {
        return `This action updates a #${id} chatRoom`;
    }
    remove(id) {
        return `This action removes a #${id} chatRoom`;
    }
};
exports.ChatRoomService = ChatRoomService;
exports.ChatRoomService = ChatRoomService = __decorate([
    (0, common_1.Injectable)()
], ChatRoomService);
//# sourceMappingURL=chat-room.service.js.map
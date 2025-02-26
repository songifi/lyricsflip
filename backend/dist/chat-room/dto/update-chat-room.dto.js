"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_chat_room_dto_1 = require("./create-chat-room.dto");
class UpdateChatRoomDto extends (0, swagger_1.PartialType)(create_chat_room_dto_1.CreateChatRoomDto) {
}
exports.UpdateChatRoomDto = UpdateChatRoomDto;
//# sourceMappingURL=update-chat-room.dto.js.map
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
export declare class ChatRoomService {
    create(createChatRoomDto: CreateChatRoomDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChatRoomDto: UpdateChatRoomDto): string;
    remove(id: number): string;
}

import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    create(createRoomDto: CreateRoomDto): Promise<import("./entities/room.entity").Room>;
    findAll(): Promise<import("./entities/room.entity").Room[]>;
    findOne(id: string): Promise<import("./entities/room.entity").Room>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<import("./entities/room.entity").Room>;
    remove(id: string): Promise<import("./entities/room.entity").Room>;
}

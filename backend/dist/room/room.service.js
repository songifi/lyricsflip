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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("./entities/room.entity");
let RoomService = class RoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    generateRoomCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    create(createRoomDto) {
        const room = this.roomRepository.create({
            ...createRoomDto,
            code: this.generateRoomCode(),
        });
        return this.roomRepository.save(room);
    }
    findAll() {
        return this.roomRepository.find();
    }
    async findOne(id) {
        const room = await this.roomRepository.findOne({ where: { id } });
        if (!room) {
            throw new common_1.NotFoundException(`Room with ID ${id} not found`);
        }
        return room;
    }
    async update(id, updateRoomDto) {
        const room = await this.findOne(id);
        Object.assign(room, updateRoomDto);
        return this.roomRepository.save(room);
    }
    async remove(id) {
        const room = await this.findOne(id);
        return this.roomRepository.remove(room);
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomService);
//# sourceMappingURL=room.service.js.map
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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const room_service_1 = require("./room.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    create(createRoomDto) {
        return this.roomService.create(createRoomDto);
    }
    findAll() {
        return this.roomService.findAll();
    }
    findOne(id) {
        return this.roomService.findOne(id);
    }
    update(id, updateRoomDto) {
        return this.roomService.update(id, updateRoomDto);
    }
    remove(id) {
        return this.roomService.remove(id);
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new room' }),
    (0, swagger_1.ApiBody)({ type: create_room_dto_1.CreateRoomDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Room created successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all room' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all room successfully retrieved',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a room by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a room',
        description: 'Update an existing room by its ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the room to be updated',
        type: 'string',
    }),
    (0, swagger_1.ApiBody)({ type: update_room_dto_1.UpdateRoomDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Room successfully updated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Room not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a room',
        description: 'Delete a room from the collection by its ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the room to be deleted',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Room successfully deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Room not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "remove", null);
exports.RoomController = RoomController = __decorate([
    (0, swagger_1.ApiTags)('room'),
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map
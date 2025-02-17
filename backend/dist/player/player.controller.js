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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const player_service_1 = require("./providers/player.service");
const create_player_dto_1 = require("./dtos/create-player.dto");
let PlayerController = class PlayerController {
    constructor(playerService) {
        this.playerService = playerService;
    }
    allPlayers(page = 1, limit = 10) {
        return this.playerService.allPlayers(Number(page), Number(limit));
    }
    createPlayer(playerDto) {
        return this.playerService.createPlayer(playerDto);
    }
    viewPlayer(id) {
        return this.playerService.viewPlayer(id);
    }
    updatePlayer(id) {
        return this.playerService.updatePlayer(id);
    }
    deletePlayer(id) {
        return this.playerService.deletePlayer(id);
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'All players',
        description: 'View all players',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10, description: 'Number of items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Players fetched',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "allPlayers", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create player',
        description: 'Create a new player',
    }),
    (0, swagger_1.ApiBody)({ type: create_player_dto_1.PlayerDTO }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Player created',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid player data',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.PlayerDTO]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "createPlayer", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'View player',
        description: 'View a player detail',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique ID of the player',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Player fetched',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Player not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "viewPlayer", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update player',
        description: 'Update player detail',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique ID of the player',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Player updated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid player data',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "updatePlayer", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete player',
        description: 'Delete player',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique ID of the player',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Player deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Player not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "deletePlayer", null);
exports.PlayerController = PlayerController = __decorate([
    (0, swagger_1.ApiTags)('player'),
    (0, common_1.Controller)('player'),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map
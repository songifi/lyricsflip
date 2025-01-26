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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../player.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_player_services_1 = require("./create-player.services");
let PlayerService = class PlayerService {
    constructor(playerRepository, createPlayerProvider) {
        this.playerRepository = playerRepository;
        this.createPlayerProvider = createPlayerProvider;
    }
    async allPlayers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.playerRepository.findAndCount({
            skip,
            take: limit,
        });
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async viewPlayer(id) {
        const data = await this.playerRepository.findOneBy({ id });
        return data;
    }
    async updatePlayer(id) {
        const data = await this.playerRepository.findOneBy({ id });
        return data;
    }
    async deletePlayer(id) {
        const data = await this.playerRepository.delete({ id });
        return data;
    }
    async createPlayer(playerDto) {
        const data = await this.createPlayerProvider.createPlayer(playerDto);
        return data;
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        create_player_services_1.CreatePlayerProvider])
], PlayerService);
//# sourceMappingURL=player.service.js.map
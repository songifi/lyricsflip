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
exports.CreatePlayerProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../player.entity");
const typeorm_2 = require("typeorm");
let CreatePlayerProvider = class CreatePlayerProvider {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async createPlayer(playerDto) {
        let isEmailExist;
        try {
            isEmailExist = await this.playerRepository.findOne({
                where: { email: playerDto.email },
            });
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment, Please try later', {
                description: 'Error processing your request',
            });
        }
        if (isEmailExist) {
            throw new common_1.BadRequestException('Player email already exist');
        }
        let newPlayer = this.playerRepository.create(playerDto);
        try {
            newPlayer = await this.playerRepository.save(newPlayer);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment, Please try later', {
                description: 'Error processing your request',
            });
        }
        return [newPlayer];
    }
};
exports.CreatePlayerProvider = CreatePlayerProvider;
exports.CreatePlayerProvider = CreatePlayerProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CreatePlayerProvider);
//# sourceMappingURL=create-player.services.js.map
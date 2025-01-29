"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModule = void 0;
const common_1 = require("@nestjs/common");
const player_controller_1 = require("./player.controller");
const player_service_1 = require("./providers/player.service");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("./player.entity");
const create_player_services_1 = require("./providers/create-player.services");
let PlayerModule = class PlayerModule {
};
exports.PlayerModule = PlayerModule;
exports.PlayerModule = PlayerModule = __decorate([
    (0, common_1.Module)({
        controllers: [player_controller_1.PlayerController],
        providers: [player_service_1.PlayerService, create_player_services_1.CreatePlayerProvider],
        imports: [typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player])],
        exports: [player_service_1.PlayerService],
    })
], PlayerModule);
//# sourceMappingURL=player.module.js.map
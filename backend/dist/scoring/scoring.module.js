"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const scoring_service_1 = require("./scoring.service");
const scoring_controller_1 = require("./scoring.controller");
const scoring_entity_1 = require("./entities/scoring.entity");
const player_entity_1 = require("../player/player.entity");
let ScoringModule = class ScoringModule {
};
exports.ScoringModule = ScoringModule;
exports.ScoringModule = ScoringModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player, scoring_entity_1.Scoring]),
            event_emitter_1.EventEmitterModule.forRoot(),
        ],
        controllers: [scoring_controller_1.ScoringController],
        providers: [scoring_service_1.ScoringService],
        exports: [scoring_service_1.ScoringService],
    })
], ScoringModule);
//# sourceMappingURL=scoring.module.js.map
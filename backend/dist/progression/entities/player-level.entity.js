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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerLevel = void 0;
const typeorm_1 = require("typeorm");
const player_stats_entity_1 = require("./player-stats.entity");
let PlayerLevel = class PlayerLevel {
};
exports.PlayerLevel = PlayerLevel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlayerLevel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_stats_entity_1.PlayerStats, stats => stats.levelHistory),
    __metadata("design:type", player_stats_entity_1.PlayerStats)
], PlayerLevel.prototype, "playerStats", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PlayerLevel.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PlayerLevel.prototype, "xpGained", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PlayerLevel.prototype, "totalXp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PlayerLevel.prototype, "achievedAt", void 0);
exports.PlayerLevel = PlayerLevel = __decorate([
    (0, typeorm_1.Entity)()
], PlayerLevel);
//# sourceMappingURL=player-level.entity.js.map
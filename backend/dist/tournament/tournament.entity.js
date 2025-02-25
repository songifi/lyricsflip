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
exports.Tournament = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const game_session_entity_1 = require("../game-session/game-session.entity");
let Tournament = class Tournament {
};
exports.Tournament = Tournament;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tournament.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tournament.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Tournament.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Tournament.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Object)
], Tournament.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", Array)
], Tournament.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => game_session_entity_1.GameSession, (gameSession) => gameSession),
    __metadata("design:type", Array)
], Tournament.prototype, "matches", void 0);
exports.Tournament = Tournament = __decorate([
    (0, typeorm_1.Entity)()
], Tournament);
//# sourceMappingURL=tournament.entity.js.map
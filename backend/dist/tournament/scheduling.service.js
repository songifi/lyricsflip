"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingService = void 0;
const common_1 = require("@nestjs/common");
const game_session_entity_1 = require("../game-session/game-session.entity");
let SchedulingService = class SchedulingService {
    schedule(tournament) {
        const participants = tournament.participants;
        const matches = [];
        for (let i = 0; i < participants.length; i++) {
            for (let j = i + 1; j < participants.length; j++) {
                const match = new game_session_entity_1.GameSession();
                match.players = [participants[i], participants[j]];
                match.startTime = this.getMatchTime();
                matches.push(match);
            }
        }
        return matches;
    }
    getMatchTime() {
        return new Date();
    }
};
exports.SchedulingService = SchedulingService;
exports.SchedulingService = SchedulingService = __decorate([
    (0, common_1.Injectable)()
], SchedulingService);
//# sourceMappingURL=scheduling.service.js.map
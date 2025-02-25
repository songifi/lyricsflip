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
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tournament_entity_1 = require("./tournament.entity");
const player_entity_1 = require("../player/player.entity");
const game_session_entity_1 = require("../game-session/game-session.entity");
const scheduling_service_1 = require("./scheduling.service");
let TournamentService = class TournamentService {
    constructor(tournamentRepository, playerRepository, gameSessionRepository, schedulingService) {
        this.tournamentRepository = tournamentRepository;
        this.playerRepository = playerRepository;
        this.gameSessionRepository = gameSessionRepository;
        this.schedulingService = schedulingService;
    }
    async createTournament(name, startTime, endTime, rules, participantIds) {
        const participants = await this.playerRepository.find({
            where: participantIds.map((id) => ({ id })),
        });
        const tournament = this.tournamentRepository.create({
            name,
            startTime,
            endTime,
            rules,
            participants,
        });
        return this.tournamentRepository.save(tournament);
    }
    async scheduleMatches(tournamentId) {
        const tournament = await this.tournamentRepository.findOne({
            where: { id: tournamentId },
            relations: ['participants'],
        });
        if (!tournament) {
            throw new Error('Tournament not found');
        }
        const matches = await this.schedulingService.schedule(tournament);
        return this.gameSessionRepository.save(matches);
    }
    async applyScoring(tournamentId) {
        const tournament = await this.tournamentRepository.findOne({
            where: { id: tournamentId },
            relations: ['matches'],
        });
        if (!tournament) {
            throw new Error('Tournament not found');
        }
        tournament.matches.forEach((match) => {
            this.applyMatchScoringRules(match);
        });
        await this.gameSessionRepository.save(tournament.matches);
    }
    applyMatchScoringRules(match) {
        if (match.players.length === 2) {
            const [player1, player2] = match.players;
        }
    }
};
exports.TournamentService = TournamentService;
exports.TournamentService = TournamentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tournament_entity_1.Tournament)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __param(2, (0, typeorm_1.InjectRepository)(game_session_entity_1.GameSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        scheduling_service_1.SchedulingService])
], TournamentService);
//# sourceMappingURL=tournament.service.js.map
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
exports.ProgressionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const player_stats_entity_1 = require("../entities/player-stats.entity");
const player_level_entity_1 = require("../entities/player-level.entity");
let ProgressionService = class ProgressionService {
    constructor(playerStatsRepository, playerLevelRepository, eventEmitter) {
        this.playerStatsRepository = playerStatsRepository;
        this.playerLevelRepository = playerLevelRepository;
        this.eventEmitter = eventEmitter;
    }
    async addXp(xpEvent) {
        const playerStats = await this.getOrCreatePlayerStats(xpEvent.userId);
        const oldLevel = playerStats.level;
        playerStats.totalXp += xpEvent.amount;
        const newLevel = this.calculateLevel(playerStats.totalXp);
        if (newLevel > oldLevel) {
            await this.handleLevelUp(playerStats, oldLevel, newLevel);
        }
        playerStats.level = newLevel;
        await this.updateSkillRating(playerStats);
        await this.updateRank(playerStats);
        const updatedStats = await this.playerStatsRepository.save(playerStats);
        this.eventEmitter.emit('progression.xp.added', {
            userId: xpEvent.userId,
            amount: xpEvent.amount,
            source: xpEvent.source,
            newTotal: updatedStats.totalXp,
            oldLevel,
            newLevel: updatedStats.level,
        });
        return updatedStats;
    }
    async handleLevelUp(playerStats, oldLevel, newLevel) {
        const levelUpEvent = this.playerLevelRepository.create({
            playerStats,
            level: newLevel,
            xpGained: this.calculateLevelXp(newLevel) - this.calculateLevelXp(oldLevel),
            totalXp: playerStats.totalXp,
        });
        await this.playerLevelRepository.save(levelUpEvent);
        this.eventEmitter.emit('progression.level.up', {
            userId: playerStats.userId,
            oldLevel,
            newLevel,
            rewards: await this.calculateLevelUpRewards(newLevel),
        });
    }
    calculateLevel(totalXp) {
        return Math.floor(Math.sqrt(totalXp / 100)) + 1;
    }
    calculateLevelXp(level) {
        return Math.pow(level - 1, 2) * 100;
    }
    async calculateLevelUpRewards(level) {
        return {
            coins: level * 100,
            items: [reward_$, { level }],
        };
    }
    async updateSkillRating(playerStats) {
        const baseRating = playerStats.level * 100;
        const performanceBonus = Math.floor(Math.random() * 50);
        playerStats.skillRating = baseRating + performanceBonus;
    }
    async updateRank(playerStats) {
        const ranks = [
            { name: 'Bronze', threshold: 0 },
            { name: 'Silver', threshold: 1000 },
            { name: 'Gold', threshold: 2000 },
            { name: 'Platinum', threshold: 3000 },
            { name: 'Diamond', threshold: 4000 },
        ];
        const newRank = ranks
            .reverse()
            .find(rank => playerStats.skillRating >= rank.threshold);
        if (newRank && newRank.name !== playerStats.rank) {
            const oldRank = playerStats.rank;
            playerStats.rank = newRank.name;
            this.eventEmitter.emit('progression.rank.changed', {
                userId: playerStats.userId,
                oldRank,
                newRank: newRank.name,
            });
        }
    }
    async getOrCreatePlayerStats(userId) {
        let playerStats = await this.playerStatsRepository.findOne({
            where: { userId },
            relations: ['levelHistory', 'skills'],
        });
        if (!playerStats) {
            playerStats = this.playerStatsRepository.create({
                userId,
                rank: 'Bronze',
                achievements: [],
                milestones: [],
            });
            await this.playerStatsRepository.save(playerStats);
        }
        return playerStats;
    }
};
exports.ProgressionService = ProgressionService;
exports.ProgressionService = ProgressionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_stats_entity_1.PlayerStats)),
    __param(1, (0, typeorm_1.InjectRepository)(player_level_entity_1.PlayerLevel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], ProgressionService);
//# sourceMappingURL=progression.service.js.map
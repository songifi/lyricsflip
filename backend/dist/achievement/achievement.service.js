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
exports.AchievementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const achievement_entity_1 = require("./entities/achievement.entity");
const user_achievement_entity_1 = require("./entities/user-achievement.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
let AchievementService = class AchievementService {
    constructor(achievementRepository, userAchievementRepository, eventEmitter) {
        this.achievementRepository = achievementRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.eventEmitter = eventEmitter;
    }
    async create(createAchievementDto) {
        const achievement = this.achievementRepository.create(createAchievementDto);
        return this.achievementRepository.save(achievement);
    }
    async trackProgress(userId, eventType, eventData) {
        const relevantAchievements = await this.achievementRepository.find({
            where: {
                'criteria.eventType': eventType,
            },
        });
        for (const achievement of relevantAchievements) {
            const userAchievement = await this.getUserAchievement(userId, achievement.id);
            if (userAchievement.isCompleted)
                continue;
            const newProgress = await this.calculateProgress(achievement, userAchievement, eventData);
            userAchievement.progress = newProgress;
            if (newProgress >= 1) {
                await this.unlockAchievement(userId, achievement.id);
            }
            else {
                await this.userAchievementRepository.save(userAchievement);
            }
        }
    }
    async unlockAchievement(userId, achievementId) {
        const userAchievement = await this.getUserAchievement(userId, achievementId);
        if (userAchievement.isCompleted)
            return;
        userAchievement.isCompleted = true;
        userAchievement.progress = 1;
        userAchievement.unlockedAt = new Date();
        await this.userAchievementRepository.save(userAchievement);
        const achievement = await this.achievementRepository.findOne(achievementId);
        this.eventEmitter.emit('achievement.unlocked', {
            userId,
            achievement,
            unlockedAt: userAchievement.unlockedAt,
        });
    }
    async getUserAchievement(userId, achievementId) {
        let userAchievement = await this.userAchievementRepository.findOne({
            where: {
                user: { id: userId },
                achievement: { id: achievementId },
            },
        });
        if (!userAchievement) {
            userAchievement = this.userAchievementRepository.create({
                user: { id: userId },
                achievement: { id: achievementId },
                progress: 0,
            });
            await this.userAchievementRepository.save(userAchievement);
        }
        return userAchievement;
    }
    async calculateProgress(achievement, userAchievement, eventData) {
        const currentProgress = userAchievement.progress;
        const increment = this.evaluateCriteria(achievement.criteria, eventData);
        return Math.min(1, currentProgress + increment);
    }
    evaluateCriteria(criteria, eventData) {
        return 0.1;
    }
};
exports.AchievementService = AchievementService;
exports.AchievementService = AchievementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(achievement_entity_1.Achievement)),
    __param(1, (0, typeorm_1.InjectRepository)(user_achievement_entity_1.UserAchievement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], AchievementService);
//# sourceMappingURL=achievement.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const achievement_controller_1 = require("./achievement.controller");
const achievement_service_1 = require("./achievement.service");
const achievement_gateway_1 = require("./achievement.gateway");
const achievement_entity_1 = require("./entities/achievement.entity");
const user_achievement_entity_1 = require("./entities/user-achievement.entity");
let AchievementModule = class AchievementModule {
};
exports.AchievementModule = AchievementModule;
exports.AchievementModule = AchievementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([achievement_entity_1.Achievement, user_achievement_entity_1.UserAchievement]),
        ],
        controllers: [achievement_controller_1.AchievementController],
        providers: [achievement_service_1.AchievementService, achievement_gateway_1.AchievementGateway],
        exports: [achievement_service_1.AchievementService],
    })
], AchievementModule);
//# sourceMappingURL=achievement.module.js.map
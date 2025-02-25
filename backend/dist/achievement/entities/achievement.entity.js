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
exports.Achievement = exports.AchievementCategory = void 0;
Achievement;
System;
Implementation;
const typeorm_1 = require("typeorm");
var AchievementCategory;
(function (AchievementCategory) {
    AchievementCategory["STREAK"] = "STREAK";
    AchievementCategory["SCORE"] = "SCORE";
    AchievementCategory["GENRE"] = "GENRE";
    AchievementCategory["SOCIAL"] = "SOCIAL";
    AchievementCategory["MISC"] = "MISC";
})(AchievementCategory || (exports.AchievementCategory = AchievementCategory = {}));
let Achievement = class Achievement {
};
exports.Achievement = Achievement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Achievement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Achievement.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Achievement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Achievement.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AchievementCategory }),
    __metadata("design:type", String)
], Achievement.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Achievement.prototype, "pointsValue", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], Achievement.prototype, "criteria", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Achievement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Achievement.prototype, "updatedAt", void 0);
exports.Achievement = Achievement = __decorate([
    (0, typeorm_1.Entity)()
], Achievement);
//# sourceMappingURL=achievement.entity.js.map
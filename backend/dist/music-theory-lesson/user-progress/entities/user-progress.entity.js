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
exports.UserProgress = void 0;
const music_theory_lesson_entity_1 = require("../../music-lessons/entities/music-theory-lesson.entity");
const user_entity_1 = require("../../../user/user.entity");
const typeorm_1 = require("typeorm");
let UserProgress = class UserProgress {
};
exports.UserProgress = UserProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], UserProgress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => music_theory_lesson_entity_1.MusicLesson),
    __metadata("design:type", music_theory_lesson_entity_1.MusicLesson)
], UserProgress.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserProgress.prototype, "completed", void 0);
exports.UserProgress = UserProgress = __decorate([
    (0, typeorm_1.Entity)()
], UserProgress);
//# sourceMappingURL=user-progress.entity.js.map
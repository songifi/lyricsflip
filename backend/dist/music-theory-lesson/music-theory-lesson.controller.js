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
exports.MusicTheoryLessonController = void 0;
const common_1 = require("@nestjs/common");
const music_theory_lesson_service_1 = require("./music-theory-lesson.service");
const create_music_theory_lesson_dto_1 = require("./dto/create-music-theory-lesson.dto");
const update_music_theory_lesson_dto_1 = require("./dto/update-music-theory-lesson.dto");
let MusicTheoryLessonController = class MusicTheoryLessonController {
    constructor(musicTheoryLessonService) {
        this.musicTheoryLessonService = musicTheoryLessonService;
    }
    create(createMusicTheoryLessonDto) {
        return this.musicTheoryLessonService.create(createMusicTheoryLessonDto);
    }
    findAll() {
        return this.musicTheoryLessonService.findAll();
    }
    findOne(id) {
        return this.musicTheoryLessonService.findOne(+id);
    }
    update(id, updateMusicTheoryLessonDto) {
        return this.musicTheoryLessonService.update(+id, updateMusicTheoryLessonDto);
    }
    remove(id) {
        return this.musicTheoryLessonService.remove(+id);
    }
};
exports.MusicTheoryLessonController = MusicTheoryLessonController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_music_theory_lesson_dto_1.CreateMusicTheoryLessonDto]),
    __metadata("design:returntype", void 0)
], MusicTheoryLessonController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicTheoryLessonController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicTheoryLessonController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_music_theory_lesson_dto_1.UpdateMusicTheoryLessonDto]),
    __metadata("design:returntype", void 0)
], MusicTheoryLessonController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicTheoryLessonController.prototype, "remove", null);
exports.MusicTheoryLessonController = MusicTheoryLessonController = __decorate([
    (0, common_1.Controller)('music-theory-lesson'),
    __metadata("design:paramtypes", [music_theory_lesson_service_1.MusicTheoryLessonService])
], MusicTheoryLessonController);
//# sourceMappingURL=music-theory-lesson.controller.js.map
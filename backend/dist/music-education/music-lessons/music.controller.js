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
exports.MusicLessonsController = void 0;
const common_1 = require("@nestjs/common");
const music_theory_lesson_service_1 = require("./providers/music-theory-lesson.service");
let MusicLessonsController = class MusicLessonsController {
    constructor(musicLessonsService) {
        this.musicLessonsService = musicLessonsService;
    }
    findAll() {
        return this.musicLessonsService.findAll();
    }
    findOne(id) {
        return this.musicLessonsService.findOne(id);
    }
    create(lesson) {
        return this.musicLessonsService.create(lesson);
    }
};
exports.MusicLessonsController = MusicLessonsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicLessonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MusicLessonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MusicLessonsController.prototype, "create", null);
exports.MusicLessonsController = MusicLessonsController = __decorate([
    (0, common_1.Controller)('music-lessons'),
    __metadata("design:paramtypes", [music_theory_lesson_service_1.MusicLessonsService])
], MusicLessonsController);
//# sourceMappingURL=music.controller.js.map
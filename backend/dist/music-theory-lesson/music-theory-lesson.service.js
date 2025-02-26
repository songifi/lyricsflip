"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicTheoryLessonService = void 0;
const common_1 = require("@nestjs/common");
let MusicTheoryLessonService = class MusicTheoryLessonService {
    create(createMusicTheoryLessonDto) {
        return 'This action adds a new musicTheoryLesson';
    }
    findAll() {
        return `This action returns all musicTheoryLesson`;
    }
    findOne(id) {
        return `This action returns a #${id} musicTheoryLesson`;
    }
    update(id, updateMusicTheoryLessonDto) {
        return `This action updates a #${id} musicTheoryLesson`;
    }
    remove(id) {
        return `This action removes a #${id} musicTheoryLesson`;
    }
};
exports.MusicTheoryLessonService = MusicTheoryLessonService;
exports.MusicTheoryLessonService = MusicTheoryLessonService = __decorate([
    (0, common_1.Injectable)()
], MusicTheoryLessonService);
//# sourceMappingURL=music-theory-lesson.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicTheoryLessonModule = void 0;
const common_1 = require("@nestjs/common");
const music_theory_lesson_service_1 = require("./music-theory-lesson.service");
const artist_entity_1 = require("./artists/entities/artist.entity");
const genre_history_entity_1 = require("./genre-history/entities/genre-history.entity");
const quiz_entity_1 = require("./quiz/entities/quiz.entity");
const user_progress_entity_1 = require("./user-progress/entities/user-progress.entity");
const music_theory_lesson_entity_1 = require("./music-lessons/entities/music-theory-lesson.entity");
const music_theory_lesson_controller_1 = require("./music-theory-lesson.controller");
const typeorm_1 = require("@nestjs/typeorm");
const music_theory_lesson_service_2 = require("./music-lessons/providers/music-theory-lesson.service");
let MusicTheoryLessonModule = class MusicTheoryLessonModule {
};
exports.MusicTheoryLessonModule = MusicTheoryLessonModule;
exports.MusicTheoryLessonModule = MusicTheoryLessonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                artist_entity_1.Artist,
                genre_history_entity_1.GenreHistory,
                music_theory_lesson_entity_1.MusicLesson,
                quiz_entity_1.Quiz,
                user_progress_entity_1.UserProgress,
            ]),
        ],
        controllers: [music_theory_lesson_controller_1.MusicEducationController],
        providers: [music_theory_lesson_service_1.MusicEducationService, music_theory_lesson_service_2.MusicLessonsService],
        exports: [music_theory_lesson_service_2.MusicLessonsService],
    })
], MusicTheoryLessonModule);
//# sourceMappingURL=music-theory-lesson.module.js.map
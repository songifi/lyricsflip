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
exports.MusicEducationController = void 0;
const common_1 = require("@nestjs/common");
let MusicEducationController = class MusicEducationController {
    getOverview() {
        return {
            message: 'Welcome to the Music Education API!',
            features: [
                'Quiz',
                'Music Lessons',
                'Genre History',
                'Artists',
                'User Progress',
            ],
        };
    }
};
exports.MusicEducationController = MusicEducationController;
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicEducationController.prototype, "getOverview", null);
exports.MusicEducationController = MusicEducationController = __decorate([
    (0, common_1.Controller)('music-education')
], MusicEducationController);
//# sourceMappingURL=music-theory-lesson.controller.js.map
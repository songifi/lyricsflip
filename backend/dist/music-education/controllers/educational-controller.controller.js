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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationController = void 0;
const common_1 = require("@nestjs/common");
let EducationController = class EducationController {
    constructor(educationService) {
        this.educationService = educationService;
    }
    async getLessons() {
        return this.educationService.getLessons();
    }
    async getGenreHistory() {
        return this.educationService.getGenreHistory();
    }
    async getArtists() {
        return this.educationService.getArtists();
    }
    async getRandomQuiz() {
        return this.educationService.getRandomQuiz();
    }
    async getUserProgress(userId) {
        return this.educationService.getUserProgress(userId);
    }
};
exports.EducationController = EducationController;
__decorate([
    (0, common_1.Get)('/lessons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "getLessons", null);
__decorate([
    (0, common_1.Get)('/history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "getGenreHistory", null);
__decorate([
    (0, common_1.Get)('/artists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "getArtists", null);
__decorate([
    (0, common_1.Get)('/quiz/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "getRandomQuiz", null);
__decorate([
    (0, common_1.Get)('/progress/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "getUserProgress", null);
exports.EducationController = EducationController = __decorate([
    (0, common_1.Controller)('education'),
    __metadata("design:paramtypes", [typeof (_a = typeof  !== "undefined" && ) === "function" ? _a : Object])
], EducationController);
//# sourceMappingURL=educational-controller.controller.js.map
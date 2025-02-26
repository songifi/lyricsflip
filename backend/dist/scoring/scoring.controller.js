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
exports.ScoringController = void 0;
const common_1 = require("@nestjs/common");
const scoring_service_1 = require("./scoring.service");
const create_scoring_dto_1 = require("./dto/create-scoring.dto");
const update_scoring_dto_1 = require("./dto/update-scoring.dto");
let ScoringController = class ScoringController {
    constructor(scoringService) {
        this.scoringService = scoringService;
    }
    async recordScore(createScoringDto) {
        return await this.scoringService.recordScore(createScoringDto.userId, createScoringDto.score);
    }
    async calculateRankings() {
        return await this.scoringService.calculateRankings();
    }
    async getUserStatistics(userId) {
        return await this.scoringService.getUserStatistics(userId);
    }
    async getLeaderboard() {
        return await this.scoringService.getLeaderboard();
    }
    async updateScore(id, updateScoringDto) {
        return await this.scoringService.updateScore(id, updateScoringDto);
    }
};
exports.ScoringController = ScoringController;
__decorate([
    (0, common_1.Post)('record'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scoring_dto_1.CreateScoringDto]),
    __metadata("design:returntype", Promise)
], ScoringController.prototype, "recordScore", null);
__decorate([
    (0, common_1.Get)('rankings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScoringController.prototype, "calculateRankings", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScoringController.prototype, "getUserStatistics", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScoringController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_scoring_dto_1.UpdateScoringDto]),
    __metadata("design:returntype", Promise)
], ScoringController.prototype, "updateScore", null);
exports.ScoringController = ScoringController = __decorate([
    (0, common_1.Controller)('scoring'),
    __metadata("design:paramtypes", [scoring_service_1.ScoringService])
], ScoringController);
//# sourceMappingURL=scoring.controller.js.map
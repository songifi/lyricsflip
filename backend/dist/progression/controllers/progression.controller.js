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
exports.ProgressionController = void 0;
const common_1 = require("@nestjs/common");
const progression_service_1 = require("../services/progression.service");
const xp_event_dto_1 = require("../dtos/xp-event.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let ProgressionController = class ProgressionController {
    constructor(progressionService) {
        this.progressionService = progressionService;
    }
    addXp(xpEvent) {
        return this.progressionService.addXp(xpEvent);
    }
    getPlayerStats(userId) {
        return this.progressionService.getOrCreatePlayerStats(userId);
    }
};
exports.ProgressionController = ProgressionController;
__decorate([
    (0, common_1.Post)('xp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [xp_event_dto_1.XpEventDto]),
    __metadata("design:returntype", void 0)
], ProgressionController.prototype, "addXp", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProgressionController.prototype, "getPlayerStats", null);
exports.ProgressionController = ProgressionController = __decorate([
    (0, common_1.Controller)('progression'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [progression_service_1.ProgressionService])
], ProgressionController);
//# sourceMappingURL=progression.controller.js.map
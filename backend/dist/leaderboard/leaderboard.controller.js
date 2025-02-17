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
exports.LeaderboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leaderboard_service_1 = require("./providers/leaderboard.service");
let LeaderboardController = class LeaderboardController {
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
    }
    getLeaderboard() {
        return this.leaderboardService.getLeaderboard();
    }
    getPlayerRank() {
        return this.leaderboardService.getPlayerRank();
    }
};
exports.LeaderboardController = LeaderboardController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get leaderboard', description: 'Retrieves the global leaderboard ranking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leaderboard successfully retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error occurred' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaderboardController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Get)('rank/:playerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get player rank', description: 'Retrieves the rank of a specific player' }),
    (0, swagger_1.ApiParam)({
        name: 'playerId',
        type: 'string',
        description: 'Unique identifier of the player',
        example: 'player123'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Player rank successfully retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Player not found' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaderboardController.prototype, "getPlayerRank", null);
exports.LeaderboardController = LeaderboardController = __decorate([
    (0, swagger_1.ApiTags)('leaderboard'),
    (0, common_1.Controller)('leaderboard'),
    __metadata("design:paramtypes", [leaderboard_service_1.LeaderboardService])
], LeaderboardController);
//# sourceMappingURL=leaderboard.controller.js.map
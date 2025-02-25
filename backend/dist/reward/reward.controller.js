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
exports.RewardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reward_service_1 = require("./providers/reward.service");
let RewardController = class RewardController {
    constructor(rewardService) {
        this.rewardService = rewardService;
    }
    getRewards() {
        return this.rewardService.getRewards();
    }
    claimReward() {
        return this.rewardService.claimReward();
    }
};
exports.RewardController = RewardController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available rewards',
        description: 'Retrieve list of all available rewards'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of rewards successfully retrieved'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "getRewards", null);
__decorate([
    (0, common_1.Post)('claim'),
    (0, swagger_1.ApiOperation)({
        summary: 'Claim a reward',
        description: 'Process a reward claim with provided details'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reward successfully claimed'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid reward claim details'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error occurred'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RewardController.prototype, "claimReward", null);
exports.RewardController = RewardController = __decorate([
    (0, swagger_1.ApiTags)('reward'),
    (0, common_1.Controller)('reward'),
    __metadata("design:paramtypes", [reward_service_1.RewardService])
], RewardController);
//# sourceMappingURL=reward.controller.js.map
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
exports.WagerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wager_service_1 = require("./provider/wager.service");
let WagerController = class WagerController {
    constructor(wagerService) {
        this.wagerService = wagerService;
    }
    placeWager() {
        return this.wagerService.placeWager();
    }
    getWagerHistory() {
        return this.wagerService.getWagerHistory();
    }
    claimWinnings() {
        return this.wagerService.claimWinnings();
    }
};
exports.WagerController = WagerController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Place a wager' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Wager successfully placed' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid wager data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WagerController.prototype, "placeWager", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get wager history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Wager history retrieved' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No wager history found' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WagerController.prototype, "getWagerHistory", null);
__decorate([
    (0, common_1.Post)('claim'),
    (0, swagger_1.ApiOperation)({ summary: 'Claim winnings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Winnings successfully claimed' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'No winnings to claim' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WagerController.prototype, "claimWinnings", null);
exports.WagerController = WagerController = __decorate([
    (0, swagger_1.ApiTags)('wager'),
    (0, common_1.Controller)('wager'),
    __metadata("design:paramtypes", [wager_service_1.WagerService])
], WagerController);
//# sourceMappingURL=wager.controller.js.map
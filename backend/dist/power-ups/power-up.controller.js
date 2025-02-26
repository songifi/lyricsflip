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
exports.PowerUpController = void 0;
const common_1 = require("@nestjs/common");
const power_up_service_1 = require("./power-up.service");
const create_power_up_dto_1 = require("./dtos/create-power-up.dto");
const purchase_power_up_dto_1 = require("./dtos/purchase-power-up.dto");
let PowerUpController = class PowerUpController {
    constructor(powerUpService) {
        this.powerUpService = powerUpService;
    }
    async createPowerUp(createPowerUpDto) {
        return this.powerUpService.createPowerUp(createPowerUpDto);
    }
    async purchasePowerUp(user, purchaseDto) {
        return this.powerUpService.purchasePowerUp(user, purchaseDto);
    }
    async getActivePowerUps(user) {
        return this.powerUpService.getActivePowerUps(user);
    }
    async usePowerUp(user, powerUpId) {
        await this.powerUpService.usePowerUp(user, powerUpId);
        return { message: 'Power-up used successfully' };
    }
};
exports.PowerUpController = PowerUpController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_power_up_dto_1.CreatePowerUpDto]),
    __metadata("design:returntype", Promise)
], PowerUpController.prototype, "createPowerUp", null);
__decorate([
    (0, common_1.Post)('purchase'),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, purchase_power_up_dto_1.PurchasePowerUpDto]),
    __metadata("design:returntype", Promise)
], PowerUpController.prototype, "purchasePowerUp", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PowerUpController.prototype, "getActivePowerUps", null);
__decorate([
    (0, common_1.Post)('use'),
    __param(1, (0, common_1.Body)('powerUpId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PowerUpController.prototype, "usePowerUp", null);
exports.PowerUpController = PowerUpController = __decorate([
    (0, common_1.Controller)('power-ups'),
    __metadata("design:paramtypes", [power_up_service_1.PowerUpService])
], PowerUpController);
//# sourceMappingURL=power-up.controller.js.map
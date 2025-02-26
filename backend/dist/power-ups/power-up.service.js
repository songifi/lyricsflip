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
exports.PowerUpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const power_up_entity_1 = require("./entities/power-up.entity");
const power_up_purchase_entity_1 = require("./entities/power-up-purchase.entity");
let PowerUpService = class PowerUpService {
    constructor(powerUpRepository, powerUpPurchaseRepository) {
        this.powerUpRepository = powerUpRepository;
        this.powerUpPurchaseRepository = powerUpPurchaseRepository;
    }
    async createPowerUp(createPowerUpDto) {
        try {
            const powerUp = this.powerUpRepository.create(createPowerUpDto);
            return await this.powerUpRepository.save(powerUp);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create power-up');
        }
    }
    async getAllPowerUps() {
        try {
            return await this.powerUpRepository.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve power-ups');
        }
    }
    async getPowerUpById(id) {
        const powerUp = await this.powerUpRepository.findOne({
            where: { id },
        });
        if (!powerUp) {
            throw new common_1.NotFoundException(`Power-up with ID ${id} not found`);
        }
        return powerUp;
    }
    async updatePowerUp(id, updatePowerUpDto) {
        const powerUp = await this.getPowerUpById(id);
        Object.assign(powerUp, updatePowerUpDto);
        try {
            return await this.powerUpRepository.save(powerUp);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update power-up');
        }
    }
    async deletePowerUp(id) {
        const result = await this.powerUpRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Power-up with ID ${id} not found`);
        }
    }
    async purchasePowerUp(user, purchaseDto) {
        const powerUp = await this.getPowerUpById(purchaseDto.powerUpId);
        const purchase = new power_up_purchase_entity_1.PowerUpPurchase();
        purchase.powerUp = powerUp;
        purchase.user = user;
        purchase.purchaseDate = new Date();
        purchase.expirationDate = new Date(Date.now() + powerUp.duration * 60 * 60 * 1000);
        try {
            return await this.powerUpPurchaseRepository.save(purchase);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to purchase power-up');
        }
    }
    async getActivePowerUps(user) {
        try {
            return await this.powerUpPurchaseRepository.find({
                where: {
                    user: { id: user.id },
                    isUsed: false,
                },
                relations: ['powerUp'],
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve active power-ups');
        }
    }
    async usePowerUp(user, powerUpId) {
        if (false) {
            throw new common_1.NotFoundException('Active power-up not found');
        }
        let purchase = true;
        try {
            await this.powerUpPurchaseRepository.save(null);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to use power-up');
        }
    }
    async getPowerUpPurchaseHistory(user) {
        try {
            return await this.powerUpPurchaseRepository.find({
                where: { user: { id: user.id } },
                relations: ['powerUp'],
                order: { purchaseDate: 'DESC' },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve purchase history');
        }
    }
    async checkPowerUpAvailability(user, powerUpId) {
        return;
    }
    async extendPowerUpDuration(purchaseId, extensionHours) {
        const purchase = await this.powerUpPurchaseRepository.findOne({
            where: { id: purchaseId },
        });
        if (!purchase) {
            throw new common_1.NotFoundException(`Power-up purchase with ID ${purchaseId} not found`);
        }
        if (purchase.isUsed || purchase.expirationDate < new Date()) {
            throw new common_1.BadRequestException('Cannot extend an expired or used power-up');
        }
        purchase.expirationDate = new Date(purchase.expirationDate.getTime() + extensionHours * 60 * 60 * 1000);
        try {
            return await this.powerUpPurchaseRepository.save(purchase);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to extend power-up duration');
        }
    }
    async getPowerUpStats() {
        try {
            const totalPowerUps = await this.powerUpRepository.count();
            const totalPurchases = await this.powerUpPurchaseRepository.count();
            const activePurchases = await this.powerUpPurchaseRepository.count({
                where: {
                    isUsed: false,
                },
            });
            const popularPowerUps = await this.powerUpPurchaseRepository
                .createQueryBuilder('purchase')
                .select('powerUp.name', 'name')
                .addSelect('COUNT(*)', 'count')
                .innerJoin('purchase.powerUp', 'powerUp')
                .groupBy('powerUp.id')
                .orderBy('count', 'DESC')
                .limit(5)
                .getRawMany();
            return {
                totalPowerUps,
                totalPurchases,
                activePurchases,
                popularPowerUps,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve power-up statistics');
        }
    }
};
exports.PowerUpService = PowerUpService;
exports.PowerUpService = PowerUpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(power_up_entity_1.PowerUp)),
    __param(1, (0, typeorm_1.InjectRepository)(power_up_purchase_entity_1.PowerUpPurchase)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PowerUpService);
//# sourceMappingURL=power-up.service.js.map
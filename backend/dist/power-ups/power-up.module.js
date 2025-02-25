"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerUpModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const power_up_service_1 = require("./power-up.service");
const power_up_controller_1 = require("./power-up.controller");
const power_up_entity_1 = require("./entities/power-up.entity");
const power_up_purchase_entity_1 = require("./entities/power-up-purchase.entity");
const power_up_validation_middleware_1 = require("./power-up-validation.middleware");
let PowerUpModule = class PowerUpModule {
};
exports.PowerUpModule = PowerUpModule;
exports.PowerUpModule = PowerUpModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([power_up_entity_1.PowerUp, power_up_purchase_entity_1.PowerUpPurchase])],
        providers: [power_up_service_1.PowerUpService, power_up_validation_middleware_1.PowerUpValidationMiddleware],
        controllers: [power_up_controller_1.PowerUpController],
        exports: [power_up_service_1.PowerUpService, power_up_validation_middleware_1.PowerUpValidationMiddleware],
    })
], PowerUpModule);
//# sourceMappingURL=power-up.module.js.map
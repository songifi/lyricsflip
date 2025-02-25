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
exports.PowerUpPurchase = void 0;
const typeorm_1 = require("typeorm");
const power_up_entity_1 = require("./power-up.entity");
const user_entity_1 = require("../../user/user.entity");
let PowerUpPurchase = class PowerUpPurchase {
};
exports.PowerUpPurchase = PowerUpPurchase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PowerUpPurchase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => power_up_entity_1.PowerUp),
    __metadata("design:type", power_up_entity_1.PowerUp)
], PowerUpPurchase.prototype, "powerUp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], PowerUpPurchase.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PowerUpPurchase.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PowerUpPurchase.prototype, "expirationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PowerUpPurchase.prototype, "isUsed", void 0);
exports.PowerUpPurchase = PowerUpPurchase = __decorate([
    (0, typeorm_1.Entity)()
], PowerUpPurchase);
//# sourceMappingURL=power-up-purchase.entity.js.map
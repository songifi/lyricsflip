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
exports.TestConfigController = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("./providers/config.service");
let TestConfigController = class TestConfigController {
    constructor(configService) {
        this.configService = configService;
    }
    getConfig() {
        return {
            environment: this.configService.get('nodeEnv'),
            port: this.configService.getPort(),
            starknetNetwork: this.configService.getStarknetNetwork(),
            isDev: this.configService.isDevelopment()
        };
    }
};
exports.TestConfigController = TestConfigController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestConfigController.prototype, "getConfig", null);
exports.TestConfigController = TestConfigController = __decorate([
    (0, common_1.Controller)('config-test'),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], TestConfigController);
//# sourceMappingURL=test.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSessionModule = void 0;
const common_1 = require("@nestjs/common");
const game_session_controller_1 = require("./game-session.controller");
const game_session_service_1 = require("./providers/game-session.service");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("../auth/authConfig/jwt.config");
const jwt_1 = require("@nestjs/jwt");
let GameSessionModule = class GameSessionModule {
};
exports.GameSessionModule = GameSessionModule;
exports.GameSessionModule = GameSessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
        ],
        controllers: [game_session_controller_1.GameSessionController],
        providers: [game_session_service_1.GameSessionService],
    })
], GameSessionModule);
//# sourceMappingURL=game-session.module.js.map
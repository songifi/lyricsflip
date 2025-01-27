"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const game_session_module_1 = require("./game-session/game-session.module");
const song_module_1 = require("./song/song.module");
const wager_module_1 = require("./wager/wager.module");
const reward_module_1 = require("./reward/reward.module");
const leaderboard_module_1 = require("./leaderboard/leaderboard.module");
const notification_module_1 = require("./notification/notification.module");
const admin_module_1 = require("./admin/admin.module");
const player_module_1 = require("./player/player.module");
const typeorm_1 = require("@nestjs/typeorm");
const access_token_guard_1 = require("./auth/guard/access-token/access-token.guard");
const core_1 = require("@nestjs/core");
const config_module_1 = require("./config/config.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            game_session_module_1.GameSessionModule,
            song_module_1.SongModule,
            wager_module_1.WagerModule,
            reward_module_1.RewardModule,
            leaderboard_module_1.LeaderboardModule,
            notification_module_1.NotificationModule,
            admin_module_1.AdminModule,
            player_module_1.PlayerModule,
            config_module_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV === 'development',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: access_token_guard_1.AccessTokenGuard,
            },
            access_token_guard_1.AccessTokenGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
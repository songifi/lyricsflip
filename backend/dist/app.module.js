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
const typeorm_1 = require("@nestjs/typeorm");
const access_token_guard_1 = require("./auth/guard/access-token/access-token.guard");
const core_1 = require("@nestjs/core");
const config_module_1 = require("./config/config.module");
const global_interceptor_1 = require("./interceptors/global.interceptor");
const songs_module_1 = require("./songs/songs.module");
const scoring_module_1 = require("./scoring/scoring.module");
const chat_room_module_1 = require("./chat-room/chat-room.module");
const power_up_module_1 = require("./power-ups/power-up.module");
const tournament_service_1 = require("./tournament/tournament.service");
const tournament_module_1 = require("./tournament/tournament.module");
const gamegateway_1 = require("./websocket-game comms/providers/gamegateway");
const game_module_1 = require("./websocket-game comms/game.module");
const achievement_module_1 = require("./achievement/achievement.module");
const music_theory_lesson_module_1 = require("./music-education/music-theory-lesson.module");
const social_module_1 = require("./social/social.module");
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
            config_module_1.ConfigModule,
            game_module_1.GameModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV === 'development',
            }),
            songs_module_1.SongsModule,
            chat_room_module_1.ChatRoomModule,
            scoring_module_1.ScoringModule,
            power_up_module_1.PowerUpModule,
            tournament_module_1.TournamentModule,
            achievement_module_1.AchievementModule,
            social_module_1.SocialModule,
            music_theory_lesson_module_1.MusicTheoryLessonModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: access_token_guard_1.AccessTokenGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: global_interceptor_1.GlobalInterceptor,
            },
            tournament_service_1.TournamentService,
            gamegateway_1.GameGateway,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const friend_controller_1 = require("./controllers/friend.controller");
const profile_controller_1 = require("./controllers/profile.controller");
const activity_controller_1 = require("./controllers/activity.controller");
const challenge_controller_1 = require("./controllers/challenge.controller");
const notification_controller_1 = require("./controllers/notification.controller");
const friend_service_1 = require("./services/friend.service");
const profile_service_1 = require("./services/profile.service");
const activity_service_1 = require("./services/activity.service");
const challenge_service_1 = require("./services/challenge.service");
const notification_service_1 = require("./services/notification.service");
const friend_entity_1 = require("./entities/friend.entity");
const profile_entity_1 = require("./entities/profile.entity");
const activity_entity_1 = require("./entities/activity.entity");
const challenge_entity_1 = require("./entities/challenge.entity");
const notification_entity_1 = require("./entities/notification.entity");
const notification_gateway_1 = require("./gateways/notification.gateway");
let SocialModule = class SocialModule {
};
exports.SocialModule = SocialModule;
exports.SocialModule = SocialModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                friend_entity_1.Friend,
                profile_entity_1.Profile,
                activity_entity_1.Activity,
                challenge_entity_1.Challenge,
                notification_entity_1.Notification,
            ]),
        ],
        controllers: [
            friend_controller_1.FriendController,
            profile_controller_1.ProfileController,
            activity_controller_1.ActivityController,
            challenge_controller_1.ChallengeController,
            notification_controller_1.NotificationController,
        ],
        providers: [
            friend_service_1.FriendService,
            profile_service_1.ProfileService,
            activity_service_1.ActivityService,
            challenge_service_1.ChallengeService,
            notification_service_1.NotificationService,
            notification_gateway_1.NotificationGateway,
        ],
    })
], SocialModule);
//# sourceMappingURL=social.module.js.map
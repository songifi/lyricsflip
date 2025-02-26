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
exports.ActivityInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const activity_service_1 = require("../services/activity.service");
let ActivityInterceptor = class ActivityInterceptor {
    constructor(activityService) {
        this.activityService = activityService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.tap)(async () => {
            const request = context.switchToHttp().getRequest();
            const userId = request.user.id;
            const activityType = this.getActivityType(request);
            if (activityType) {
                await this.activityService.create({
                    type: activityType,
                    userId,
                    data: this.getActivityData(request),
                });
            }
        }));
    }
    getActivityType(request) {
    }
    getActivityData(request) {
    }
};
exports.ActivityInterceptor = ActivityInterceptor;
exports.ActivityInterceptor = ActivityInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityInterceptor);
//# sourceMappingURL=activity.interceptor.js.map
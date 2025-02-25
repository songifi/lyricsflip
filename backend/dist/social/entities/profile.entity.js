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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const friend_entity_1 = require("./friend.entity");
const activity_entity_1 = require("./activity.entity");
let Profile = class Profile {
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", typeof (_a = typeof UserStats !== "undefined" && UserStats) === "function" ? _a : Object)
], Profile.prototype, "stats", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], Profile.prototype, "achievements", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Profile.prototype, "lastActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friend_entity_1.Friend, friend => friend.profile),
    __metadata("design:type", Array)
], Profile.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activity_entity_1.Activity, activity => activity.profile),
    __metadata("design:type", Array)
], Profile.prototype, "activities", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)()
], Profile);
//# sourceMappingURL=profile.entity.js.map
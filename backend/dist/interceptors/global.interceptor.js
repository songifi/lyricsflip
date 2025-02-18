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
exports.GlobalInterceptor = void 0;
const common_1 = require("@nestjs/common");
<<<<<<<< HEAD:backend/dist/interceptors/global.interceptor.js
const rxjs_1 = require("rxjs");
let GlobalInterceptor = class GlobalInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => ({
            success: true,
            data: data,
            message: 'test message',
        })));
    }
};
exports.GlobalInterceptor = GlobalInterceptor;
exports.GlobalInterceptor = GlobalInterceptor = __decorate([
    (0, common_1.Injectable)()
], GlobalInterceptor);
//# sourceMappingURL=global.interceptor.js.map
========
const auth_service_1 = require("./../../auth/providers/auth.service");
const user_service_1 = require("../../user/providers/user.service");
const song_service_1 = require("../../song/providers/song.service");
const admin_entity_1 = require("../admin.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_admin_services_1 = require("./create-admin.services");
let AdminService = class AdminService {
    constructor(authService, userService, songService, adminRepository, createAdminProvider) {
        this.authService = authService;
        this.userService = userService;
        this.songService = songService;
        this.adminRepository = adminRepository;
        this.createAdminProvider = createAdminProvider;
    }
    async signUp(adminDTO) {
        return await this.createAdminProvider.createAdmin(adminDTO);
    }
    getPlatformStats() {
    }
    manageUsers() {
    }
    async getUser(email) {
        return await this.userService.findUserByEmail(email);
    }
    async addSong() {
        await this.songService.addSong();
    }
    async getSongs() {
        await this.songService.getSongs();
    }
    async deleteSong() {
        await this.songService.deleteSong();
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(3, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        song_service_1.SongService,
        typeorm_2.Repository,
        create_admin_services_1.CreateAdminProvider])
], AdminService);
//# sourceMappingURL=admin.service.js.map
>>>>>>>> c658da9e73156dd12a469e16aa11262be3f80820:backend/dist/admin/providers/admin.service.js

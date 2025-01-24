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
exports.FindOneUserByEmailProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
<<<<<<< HEAD
const user_entity_1 = require("../user.entity");
const typeorm_2 = require("typeorm");
=======
const hashing_provider_1 = require("../../auth/providers/hashing-provider");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user.entity");
>>>>>>> 818061761b261076822681dd1ca861393938e264
let FindOneUserByEmailProvider = class FindOneUserByEmailProvider {
    constructor(userRepository, hashingProvider) {
        this.userRepository = userRepository;
        this.hashingProvider = hashingProvider;
    }
    async FindOneByEmail(email) {
        let user;
        try {
            user = await this.userRepository.findOneBy({ email });
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process request at the moment. Please try again later', {
                description: 'Error connecting to the database',
                cause: 'possible network error'
            });
        }
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
};
exports.FindOneUserByEmailProvider = FindOneUserByEmailProvider;
exports.FindOneUserByEmailProvider = FindOneUserByEmailProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
<<<<<<< HEAD
    __metadata("design:paramtypes", [typeorm_2.Repository])
=======
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => hashing_provider_1.HashingProvider))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_provider_1.HashingProvider])
>>>>>>> 818061761b261076822681dd1ca861393938e264
], FindOneUserByEmailProvider);
//# sourceMappingURL=find-one-user-by-email.provider.js.map
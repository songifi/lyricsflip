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
exports.CreateUserProvider = void 0;
const common_1 = require("@nestjs/common");
const hashing_provider_1 = require("./hashing.provider");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user.entity");
const typeorm_2 = require("typeorm");
let CreateUserProvider = class CreateUserProvider {
    constructor(userRepository, hashingProvider) {
        this.userRepository = userRepository;
        this.hashingProvider = hashingProvider;
    }
    async createUsers(userDto) {
        let existingUser;
        try {
            existingUser = await this.userRepository.findOne({
                where: { email: userDto.email },
            });
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment, Please try later', {
                description: 'Error processing your request',
            });
        }
        if (existingUser) {
            throw new common_1.BadRequestException('User already exist');
        }
        let newUser = this.userRepository.create({
            ...userDto,
            password: await this.hashingProvider.hashPassword(userDto.password),
        });
        try {
            newUser = await this.userRepository.save(newUser);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException('Unable to process your request at the moment, Please try later', {
                description: 'Error processing your request',
            });
        }
        return [newUser];
    }
};
exports.CreateUserProvider = CreateUserProvider;
exports.CreateUserProvider = CreateUserProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_provider_1.HashingProvider])
], CreateUserProvider);
//# sourceMappingURL=create-user.services.js.map
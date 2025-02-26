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
exports.GenreHistoryController = void 0;
const common_1 = require("@nestjs/common");
const genre_history_service_1 = require("./providers/genre-history.service");
let GenreHistoryController = class GenreHistoryController {
    constructor(genreHistoryService) {
        this.genreHistoryService = genreHistoryService;
    }
    findAll() {
        return this.genreHistoryService.findAll();
    }
    findOne(id) {
        return this.genreHistoryService.findOne(id);
    }
    create(genreHistory) {
        return this.genreHistoryService.create(genreHistory);
    }
};
exports.GenreHistoryController = GenreHistoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GenreHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GenreHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GenreHistoryController.prototype, "create", null);
exports.GenreHistoryController = GenreHistoryController = __decorate([
    (0, common_1.Controller)('genre-history'),
    __metadata("design:paramtypes", [genre_history_service_1.GenreHistoryService])
], GenreHistoryController);
//# sourceMappingURL=genre-history.controller.js.map
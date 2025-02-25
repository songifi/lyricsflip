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
exports.SongsController = void 0;
const common_1 = require("@nestjs/common");
const songs_service_1 = require("./songs.service");
const create_song_dto_1 = require("./dto/create-song.dto");
const update_song_dto_1 = require("./dto/update-song.dto");
const swagger_1 = require("@nestjs/swagger");
let SongsController = class SongsController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    create(createSongDto) {
        return this.songsService.create(createSongDto);
    }
    findAll() {
        return this.songsService.findAll();
    }
    async getSongs(difficultyId, sortBy, sortOrder, searchQuery) {
        return this.songsService.searchSongs(searchQuery, { difficultyId }, { field: sortBy, order: sortOrder });
    }
    search(query) {
        return this.songsService.searchSongs(query);
    }
    findByGenre(genre) {
        return this.songsService.findByGenre(genre);
    }
    getRandomSong() {
        return this.songsService.getRandomSong();
    }
    findOne(id) {
        return this.songsService.findOne(id);
    }
    update(id, updateSongDto) {
        return this.songsService.update(id, updateSongDto);
    }
    remove(id) {
        return this.songsService.remove(id);
    }
    incrementPlayCount(id) {
        return this.songsService.updatePlayCount(id);
    }
};
exports.SongsController = SongsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new song' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_song_dto_1.CreateSongDto]),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all songs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get songs with filtering, sorting, and searching' }),
    __param(0, (0, common_1.Query)('difficulty')),
    __param(1, (0, common_1.Query)('sortBy')),
    __param(2, (0, common_1.Query)('sortOrder')),
    __param(3, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getSongs", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search songs' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('genre/:genre'),
    (0, swagger_1.ApiOperation)({ summary: 'Get songs by genre' }),
    __param(0, (0, common_1.Param)('genre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "findByGenre", null);
__decorate([
    (0, common_1.Get)('random'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a random song' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "getRandomSong", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a song by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a song' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_song_dto_1.UpdateSongDto]),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a song' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/play'),
    (0, swagger_1.ApiOperation)({ summary: 'Increment play count' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SongsController.prototype, "incrementPlayCount", null);
exports.SongsController = SongsController = __decorate([
    (0, swagger_1.ApiTags)('songs'),
    (0, common_1.Controller)('songs'),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongsController);
//# sourceMappingURL=songs.controller.js.map
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
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const song_entity_1 = require("./entities/song.entity");
let SongsService = class SongsService {
    constructor(songsRepository) {
        this.songsRepository = songsRepository;
    }
    create(createSongDto) {
        const song = this.songsRepository.create(createSongDto);
        return this.songsRepository.save(song);
    }
    findAll() {
        return this.songsRepository.find();
    }
    async findOne(id) {
        const song = await this.songsRepository.findOne({ where: { id } });
        if (!song) {
            throw new common_1.NotFoundException(`Song with ID ${id} not found`);
        }
        return song;
    }
    async update(id, updateSongDto) {
        const song = await this.findOne(id);
        Object.assign(song, updateSongDto);
        return this.songsRepository.save(song);
    }
    async remove(id) {
        const song = await this.findOne(id);
        return this.songsRepository.remove(song);
    }
    async findByGenre(genre) {
        return this.songsRepository.find({ where: { genre } });
    }
    async searchSongs(query) {
        return this.songsRepository
            .createQueryBuilder('song')
            .where('song.title ILIKE :query OR song.artist ILIKE :query', {
            query: `%${query}%`,
        })
            .getMany();
    }
    async updatePlayCount(id) {
        const song = await this.findOne(id);
        song.playCount += 1;
        return this.songsRepository.save(song);
    }
    async findByDifficulty(level) {
        return this.songsRepository.find({ where: { difficulty: level } });
    }
    async getRandomSong() {
        return this.songsRepository
            .createQueryBuilder('song')
            .orderBy('RANDOM()')
            .take(1)
            .getOne();
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(song_entity_1.Song)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map
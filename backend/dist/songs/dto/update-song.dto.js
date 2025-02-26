"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSongDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_song_dto_1 = require("./create-song.dto");
class UpdateSongDto extends (0, swagger_1.PartialType)(create_song_dto_1.CreateSongDto) {
}
exports.UpdateSongDto = UpdateSongDto;
//# sourceMappingURL=update-song.dto.js.map
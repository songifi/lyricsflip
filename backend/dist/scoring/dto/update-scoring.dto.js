"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScoringDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_scoring_dto_1 = require("./create-scoring.dto");
class UpdateScoringDto extends (0, swagger_1.PartialType)(create_scoring_dto_1.CreateScoringDto) {
}
exports.UpdateScoringDto = UpdateScoringDto;
//# sourceMappingURL=update-scoring.dto.js.map
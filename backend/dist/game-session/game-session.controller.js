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
exports.GameSessionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const game_session_service_1 = require("./providers/game-session.service");
let GameSessionController = class GameSessionController {
    constructor(gameSessionService) {
        this.gameSessionService = gameSessionService;
    }
    startGameSession() {
        return this.gameSessionService.startGameSession();
    }
    submitGuess() {
        return this.gameSessionService.submitGuess();
    }
    getSessionDetails() {
        return this.gameSessionService.getSessionDetails();
    }
};
exports.GameSessionController = GameSessionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Start a new game session',
        description: 'Creates a new game session and returns the session details.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Game session successfully created.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "startGameSession", null);
__decorate([
    (0, common_1.Post)(':id/guess'),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a guess for a game session',
        description: 'Allows a player to submit a guess for an ongoing game session.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the game session.',
        example: 'abc123',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Details of the submitted guess.',
        schema: {
            example: {
                playerId: 'player1',
                guess: 'word123',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Guess successfully submitted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid guess data.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "submitGuess", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get game session details',
        description: 'Retrieves details of a specific game session by its ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'The ID of the game session.',
        example: 'abc123',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Game session details retrieved.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Game session not found.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GameSessionController.prototype, "getSessionDetails", null);
exports.GameSessionController = GameSessionController = __decorate([
    (0, swagger_1.ApiTags)('game-session'),
    (0, common_1.Controller)('game-session'),
    __metadata("design:paramtypes", [game_session_service_1.GameSessionService])
], GameSessionController);
//# sourceMappingURL=game-session.controller.js.map
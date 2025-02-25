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
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const ws_exception_filter_1 = require("../../filters/ws-exception.filter");
let GameGateway = class GameGateway {
    constructor() {
        this.logger = new common_1.Logger('GameGateway');
        this.activeGames = new Map();
        this.players = new Map();
    }
    afterInit(server) {
        this.logger.log('Game WebSocket Gateway initialized');
    }
    async handleConnection(client) {
        try {
            this.logger.log(`Client connected: ${client.id}`);
            client.conn.on('packet', (packet) => {
                this.logger.debug(`Received packet type: ${packet.type}`);
            });
            const user = await this.validateToken(client.handshake.auth.token);
            client.data.user = user;
            this.players.set(client.id, {
                userId: user.id,
                socket: client,
                gameId: null,
            });
            this.logger.log(`Client connected: ${client.id}`);
        }
        catch (error) {
            client.disconnect();
            this.logger.error(`Connection error: ${error.message}`);
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        const player = this.players.get(client.id);
        if (player && player.gameId) {
            this.handlePlayerLeave(client, player.gameId);
        }
        this.players.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async handleCreateGame(client, data) {
        try {
            const gameId = this.generateGameId();
            const player = this.players.get(client.id);
            const game = {
                id: gameId,
                hostId: player.userId,
                players: [player.userId],
                status: 'waiting',
                mode: data.gameMode,
                scores: new Map(),
                startTime: null,
            };
            this.activeGames.set(gameId, game);
            client.join(gameId);
            player.gameId = gameId;
            return { success: true, gameId };
        }
        catch (error) {
            this.logger.error(`Create game error: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleJoinGame(client, data) {
        try {
            const game = this.activeGames.get(data.gameId);
            if (!game) {
                throw new Error('Game not found');
            }
            const player = this.players.get(client.id);
            game.players.push(player.userId);
            player.gameId = data.gameId;
            client.join(data.gameId);
            this.server.to(data.gameId).emit('playerJoined', {
                playerId: player.userId,
                playerCount: game.players.length,
            });
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Join game error: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleStartGame(client, data) {
        try {
            const game = this.activeGames.get(data.gameId);
            if (!game) {
                throw new Error('Game not found');
            }
            const player = this.players.get(client.id);
            if (game.hostId !== player.userId) {
                throw new Error('Only host can start the game');
            }
            game.status = 'playing';
            game.startTime = Date.now();
            this.server.to(data.gameId).emit('gameStarted', {
                startTime: game.startTime,
            });
            this.startNewRound(data.gameId);
        }
        catch (error) {
            this.logger.error(`Start game error: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleAnswer(client, data) {
        try {
            const game = this.activeGames.get(data.gameId);
            if (!game || game.status !== 'playing') {
                throw new Error('Invalid game state');
            }
            const player = this.players.get(client.id);
            game.scores.set(player.userId);
            this.server.to(data.gameId).emit('scoreUpdate', {
                playerId: player.userId,
                score: game.scores.get(player.userId),
            });
            return { success: true, };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    generateGameId() {
        return Math.random().toString(36).substring(2, 9).toUpperCase();
    }
    async validateToken(token) {
        return { id: 'user-id' };
    }
    async startNewRound(gameId) {
        const game = this.activeGames.get(gameId);
        if (!game)
            return;
        game.currentRound = {
            startTime: Date.now(),
        };
        this.server.to(gameId).emit('newRound', {
            timeLimit: 20000,
        });
        setTimeout(() => this.endRound(gameId), 20000);
    }
    async endRound(gameId) {
        const game = this.activeGames.get(gameId);
        if (!game)
            return;
        this.server.to(gameId).emit('roundEnded', {
            scores: Array.from(game.scores.entries()),
            correctAnswer: game.currentRound.question.correctAnswer,
        });
    }
    handlePlayerLeave(client, gameId) {
        const game = this.activeGames.get(gameId);
        if (!game)
            return;
        const player = this.players.get(client.id);
        game.players = game.players.filter(id => id !== player.userId);
        this.server.to(gameId).emit('playerLeft', {
            playerId: player.userId,
            playerCount: game.players.length,
        });
        if (game.players.length === 0) {
            this.activeGames.delete(gameId);
        }
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createGame'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleCreateGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGame'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleJoinGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startGame'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleStartGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('submitAnswer'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleAnswer", null);
exports.GameGateway = GameGateway = __decorate([
    (0, common_2.UseFilters)(new ws_exception_filter_1.WsExceptionFilter()),
    (0, websockets_1.WebSocketGateway)({
        namespace: 'game',
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingInterval: 10000,
        pingTimeout: 5000,
        connectTimeout: 45000,
        transports: ['websocket', 'polling'],
    })
], GameGateway);
//# sourceMappingURL=gamegateway.js.map
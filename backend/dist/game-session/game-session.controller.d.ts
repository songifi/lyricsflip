import { GameSessionService } from './providers/game-session.service';
export declare class GameSessionController {
    private readonly gameSessionService;
    constructor(gameSessionService: GameSessionService);
    startGameSession(): void;
    submitGuess(): void;
    getSessionDetails(): void;
}

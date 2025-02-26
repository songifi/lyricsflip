import { Player } from "../player/player.entity";
export declare class GameSession {
    id: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    players: Player[];
}

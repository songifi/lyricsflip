export declare enum XpSource {
    GAME_WIN = "GAME_WIN",
    ACHIEVEMENT = "ACHIEVEMENT",
    QUEST = "QUEST",
    DAILY_BONUS = "DAILY_BONUS"
}
export declare class XpEventDto {
    userId: string;
    amount: number;
    source: XpSource;
    metadata?: string;
}

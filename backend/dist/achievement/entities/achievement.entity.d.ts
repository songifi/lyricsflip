export declare enum AchievementCategory {
    STREAK = "STREAK",
    SCORE = "SCORE",
    GENRE = "GENRE",
    SOCIAL = "SOCIAL",
    MISC = "MISC"
}
export declare class Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: AchievementCategory;
    pointsValue: number;
    criteria: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export declare class EducationController {
    private readonly educationService;
    constructor(educationService: );
    getLessons(): Promise<any>;
    getGenreHistory(): Promise<any>;
    getArtists(): Promise<any>;
    getRandomQuiz(): Promise<any>;
    getUserProgress(userId: string): Promise<any>;
}

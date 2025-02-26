import { QuizService } from './providers/quiz.service';
import { Quiz } from './entities/quiz.entity';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    findAll(): Promise<Quiz[]>;
    findOne(id: number): Promise<Quiz>;
    create(quiz: Partial<Quiz>): Promise<Partial<Quiz> & Quiz>;
}

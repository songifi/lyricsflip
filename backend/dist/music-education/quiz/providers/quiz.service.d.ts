import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
export declare class QuizService {
    private readonly quizRepo;
    constructor(quizRepo: Repository<Quiz>);
    findAll(): Promise<Quiz[]>;
    findOne(id: number): Promise<Quiz>;
    create(quiz: Partial<Quiz>): Promise<Partial<Quiz> & Quiz>;
}

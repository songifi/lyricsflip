import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) {}

  findAll() {
    return this.quizRepo.find();
  }

  findOne(id: number) {
    return this.quizRepo.findOne({ where: { id } });
  }

  create(quiz: Partial<Quiz>) {
    return this.quizRepo.save(quiz);
  }
}

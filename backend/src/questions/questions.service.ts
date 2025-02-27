// src/questions/questions.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionFilters } from './dto/question-filters.dto';
import { SongsService } from '../songs/songs.service';
import { DuplicateLyricException } from './exceptions/question.exception';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private songsService: SongsService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    await this.validateQuestion(createQuestionDto);
    
    const song = await this.songsService.findOne(createQuestionDto.songId);
    const points = this.calculatePoints(createQuestionDto.difficulty);
    
    const question = this.questionsRepository.create({
      ...createQuestionDto,
      song,
      points,
    });

    return this.questionsRepository.save(question);
  }

  async findAll(filters: QuestionFilters): Promise<Question[]> {
    const query = this.questionsRepository.createQueryBuilder('question');

    if (filters.difficulty) {
      query.andWhere('question.difficulty = :difficulty', { 
        difficulty: filters.difficulty 
      });
    }

    if (filters.songId) {
      query.andWhere('question.songId = :songId', { 
        songId: filters.songId 
      });
    }

    if (filters.minPoints) {
      query.andWhere('question.points >= :minPoints', { 
        minPoints: filters.minPoints 
      });
    }

    if (filters.maxPoints) {
      query.andWhere('question.points <= :maxPoints', { 
        maxPoints: filters.maxPoints 
      });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionsRepository.findOne({ 
      where: { id } 
    });
    
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    
    return question;
  }

  async getRandomQuestionsByDifficulty(
    difficulty: number, 
    count: number
  ): Promise<Question[]> {
    const questions = await this.questionsRepository
      .createQueryBuilder('question')
      .where('question.difficulty = :difficulty', { difficulty })
      .orderBy('RANDOM()')
      .take(count)
      .getMany();

    if (questions.length < count) {
      throw new BadRequestException(
        `Not enough questions available for difficulty level ${difficulty}`
      );
    }

    return questions;
  }

  async updateStats(id: string, wasCorrect: boolean): Promise<Question> {
    const question = await this.findOne(id);
    
    question.timesUsed += 1;
    if (wasCorrect) {
      question.correctAnswers += 1;
    }
    
    return this.questionsRepository.save(question);
  }

  private async validateQuestion(
    createQuestionDto: CreateQuestionDto
  ): Promise<void> {
    // Check for duplicate lyrics
    const existingQuestion = await this.questionsRepository.findOne({
      where: { lyricSnippet: createQuestionDto.lyricSnippet }
    });

    if (existingQuestion) {
      throw new BadRequestException('Lyric snippet already exists');
    }

    // Validate options array
    if (createQuestionDto.options.length !== 4) {
      throw new BadRequestException('Questions must have exactly 4 options');
    }

    // Check for duplicate options
    const uniqueOptions = new Set(createQuestionDto.options);
    if (uniqueOptions.size !== createQuestionDto.options.length) {
      throw new BadRequestException('Options must be unique');
    }

    // Validate correct answer is within options range
    if (createQuestionDto.correctAnswer < 0 || 
        createQuestionDto.correctAnswer >= createQuestionDto.options.length) {
      throw new BadRequestException('Invalid correct answer index');
    }
  }

  private calculatePoints(difficulty: number): number {
    // Base points calculation based on difficulty
    const basePoints = difficulty * 100;
    
    // Additional bonus for higher difficulties
    const difficultyBonus = Math.pow(difficulty, 2) * 10;
    
    return basePoints + difficultyBonus;
  }

  private handleDatabaseError(error: any): never {
    if (error.code === '23505') { // Unique constraint violation
      throw new DuplicateLyricException();
    }
    throw error;
  }
}

// src/questions/questions.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { SongsService } from '../songs/songs.service';
import { CreateQuestionDto } from './dto/create-question.dto';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let repository: Repository<Question>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
      getOne: jest.fn(),
    })),
  };

  const mockSongsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useValue: mockRepository,
        },
        {
          provide: SongsService,
          useValue: mockSongsService,
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    repository = module.get<Repository<Question>>(getRepositoryToken(Question));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new question', async () => {
      const createQuestionDto: CreateQuestionDto = {
        songId: '1',
        lyricSnippet: 'Test lyrics',
        options: ['opt1', 'opt2', 'opt3', 'opt4'],
        correctAnswer: 0,
        difficulty: 5,
        timeLimit: 30,
      };

      const song = { id: '1', title: 'Test Song' };
      mockSongsService.findOne.mockResolvedValue(song);
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ ...createQuestionDto, song });
      mockRepository.save.mockResolvedValue({ id: '1', ...createQuestionDto, song });

      const result = await service.create(createQuestionDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  // Add more test cases for other methods...
});
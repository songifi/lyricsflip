import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreHistory } from '../entities/genre-history.entity';

@Injectable()
export class GenreHistoryService {
  constructor(
    @InjectRepository(GenreHistory)
    private readonly genreRepo: Repository<GenreHistory>,
  ) {}

  findAll() {
    return this.genreRepo.find();
  }

  findOne(id: number) {
    return this.genreRepo.findOne({ where: { id } });
  }

  create(genreHistory: Partial<GenreHistory>) {
    return this.genreRepo.save(genreHistory);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from '../entities/user-progress.entity';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectRepository(UserProgress)
    private readonly progressRepo: Repository<UserProgress>,
  ) {}

  findAll() {
    return this.progressRepo.find();
  }

  findByUser(userId: string) {
    return this.progressRepo.find({ where: { user: { id: userId } } });
  }

  markComplete(progressId: number) {
    return this.progressRepo.update(progressId, { completed: true });
  }
}

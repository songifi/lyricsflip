import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from '../entities/achievement.entity';
import { CreateAchievementDto } from '../dto/create-achievement.dto';
import { UpdateAchievementDto } from '../dto/update-achievement.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async create(createAchievementDto: CreateAchievementDto) {
    const achievement = this.achievementRepository.create(createAchievementDto);
    return this.achievementRepository.save(achievement);
  }

  async findAll() {
    return this.achievementRepository.find();
  }

  async findOne(id: string) {
    const achievement = await this.achievementRepository.findOne({
      where: { id },
    });
    if (!achievement) throw new NotFoundException('Achievement not found');
    return achievement;
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto) {
    await this.findOne(id);
    await this.achievementRepository.update(id, updateAchievementDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const achievement = await this.findOne(id);
    return this.achievementRepository.remove(achievement);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
  ) {}

  findAll() {
    return this.artistRepo.find();
  }

  findOne(id: number) {
    return this.artistRepo.findOne({ where: { id } });
  }

  create(artist: Partial<Artist>) {
    return this.artistRepo.save(artist);
  }
}

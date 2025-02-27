import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicEducationService {
  getWelcomeMessage() {
    return 'Welcome to the Music Education API!';
  }
}

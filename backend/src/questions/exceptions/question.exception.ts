import { BadRequestException,NotFoundException } from "@nestjs/common";
// src/questions/exceptions/question.exceptions.ts
export class DuplicateLyricException extends BadRequestException {
    constructor() {
      super('Lyric snippet already exists in the database');
    }
  }
  
  export class InvalidOptionsException extends BadRequestException {
    constructor() {
      super('Invalid options provided for the question');
    }
  }
  
  export class QuestionNotFoundException extends NotFoundException {
    constructor(id: string) {
     super(`Question with ID ${id} not found`)
    }
  }
  
  
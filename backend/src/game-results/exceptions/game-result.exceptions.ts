import { HttpException, HttpStatus } from '@nestjs/common';

export class GameResultProcessingException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Game Result Processing Error',
        message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class InvalidGameSessionException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Invalid Game Session',
        message: 'The game session is invalid or incomplete',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
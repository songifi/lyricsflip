import { Injectable, type NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PowerUpService } from './power-up.service';

@Injectable()
export class PowerUpValidationMiddleware implements NestMiddleware {
  constructor(private readonly powerUpService: PowerUpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = req['user'];
    const activePowerUps = await this.powerUpService.getActivePowerUps(user);

    // Add active power-ups to the request object for use in controllers
    req['activePowerUps'] = activePowerUps;

    next();
  }
}

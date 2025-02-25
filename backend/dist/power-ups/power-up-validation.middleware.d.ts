import { type NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PowerUpService } from './power-up.service';
export declare class PowerUpValidationMiddleware implements NestMiddleware {
    private readonly powerUpService;
    constructor(powerUpService: PowerUpService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}

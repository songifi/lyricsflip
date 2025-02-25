import { PowerUpService } from './power-up.service';
import { CreatePowerUpDto } from './dtos/create-power-up.dto';
import { PurchasePowerUpDto } from './dtos/purchase-power-up.dto';
export declare class PowerUpController {
    private readonly powerUpService;
    constructor(powerUpService: PowerUpService);
    createPowerUp(createPowerUpDto: CreatePowerUpDto): Promise<import("./entities/power-up.entity").PowerUp>;
    purchasePowerUp(user: any, purchaseDto: PurchasePowerUpDto): Promise<import("./entities/power-up-purchase.entity").PowerUpPurchase>;
    getActivePowerUps(user: any): Promise<import("./entities/power-up-purchase.entity").PowerUpPurchase[]>;
    usePowerUp(user: any, powerUpId: number): Promise<{
        message: string;
    }>;
}

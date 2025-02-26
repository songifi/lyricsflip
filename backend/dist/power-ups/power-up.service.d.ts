import { Repository } from 'typeorm';
import { PowerUp } from './entities/power-up.entity';
import { PowerUpPurchase } from './entities/power-up-purchase.entity';
import { CreatePowerUpDto } from './dtos/create-power-up.dto';
import { UpdatePowerUpDto } from './dtos/update-power-up.dto';
import { PurchasePowerUpDto } from './dtos/purchase-power-up.dto';
import { User } from 'src/user/user.entity';
export declare class PowerUpService {
    private powerUpRepository;
    private powerUpPurchaseRepository;
    constructor(powerUpRepository: Repository<PowerUp>, powerUpPurchaseRepository: Repository<PowerUpPurchase>);
    createPowerUp(createPowerUpDto: CreatePowerUpDto): Promise<PowerUp>;
    getAllPowerUps(): Promise<PowerUp[]>;
    getPowerUpById(id: number): Promise<PowerUp>;
    updatePowerUp(id: number, updatePowerUpDto: UpdatePowerUpDto): Promise<PowerUp>;
    deletePowerUp(id: number): Promise<void>;
    purchasePowerUp(user: User, purchaseDto: PurchasePowerUpDto): Promise<PowerUpPurchase>;
    getActivePowerUps(user: User): Promise<PowerUpPurchase[]>;
    usePowerUp(user: User, powerUpId: number): Promise<void>;
    getPowerUpPurchaseHistory(user: User): Promise<PowerUpPurchase[]>;
    checkPowerUpAvailability(user: User, powerUpId: number): Promise<boolean>;
    extendPowerUpDuration(purchaseId: number, extensionHours: number): Promise<PowerUpPurchase>;
    getPowerUpStats(): Promise<any>;
}

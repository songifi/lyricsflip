import { PowerUp } from './power-up.entity';
import { User } from 'src/user/user.entity';
export declare class PowerUpPurchase {
    id: number;
    powerUp: PowerUp;
    user: User;
    purchaseDate: Date;
    expirationDate: Date;
    isUsed: boolean;
}

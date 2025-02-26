import { WagerService } from './provider/wager.service';
export declare class WagerController {
    private readonly wagerService;
    constructor(wagerService: WagerService);
    placeWager(): void;
    getWagerHistory(): void;
    claimWinnings(): void;
}

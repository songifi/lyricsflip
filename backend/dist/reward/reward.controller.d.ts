import { RewardService } from './providers/reward.service';
export declare class RewardController {
    private readonly rewardService;
    constructor(rewardService: RewardService);
    getRewards(): void;
    claimReward(): void;
}

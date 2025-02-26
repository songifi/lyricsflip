import { FriendService } from '../services/friend.service';
export declare class FriendController {
    private readonly friendService;
    constructor(friendService: FriendService);
    sendFriendRequest(userId: string, receiverId: string): Promise<Friend>;
    acceptFriendRequest(userId: string, requestId: string): Promise<any>;
    getFriends(userId: string): Promise<Friend[]>;
}

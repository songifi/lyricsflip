import { Repository } from 'typeorm';
import { Friend } from '../entities/friend.entity';
import { NotificationService } from './notification.service';
export declare class FriendService {
    private friendRepository;
    private notificationService;
    constructor(friendRepository: Repository<Friend>, notificationService: NotificationService);
    sendFriendRequest(senderId: string, receiverId: string): Promise<Friend>;
    acceptFriendRequest(userId: string, requestId: string): Promise<any>;
    getFriends(userId: string): Promise<Friend[]>;
}

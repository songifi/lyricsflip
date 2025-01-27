import { NotificationService } from './providers/notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(): void;
    markNotificationsRead(): void;
}

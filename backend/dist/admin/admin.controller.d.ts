import { AdminService } from './providers/admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getPlatformStats(): void;
    manageUsers(): void;
    addSong(): void;
}

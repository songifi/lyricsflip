import { AdminService } from './providers/admin.service';
import { AdminDTO } from './dtos/create-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    signUp(adminDto: AdminDTO): Promise<import("./admin.entity").Admin[]>;
    getPlatformStats(): void;
    manageUsers(): void;
    addSong(): Promise<void>;
}

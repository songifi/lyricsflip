import { AuthService } from './../../auth/providers/auth.service';
import { UserService } from 'src/user/providers/user.service';
import { SongService } from 'src/song/providers/song.service';
import { Admin } from '../admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminProvider } from './create-admin.services';
import { AdminDTO } from '../dtos/create-admin.dto';
export declare class AdminService {
    private readonly authService;
    private readonly userService;
    private readonly songService;
    private readonly adminRepository;
    private readonly createAdminProvider;
    constructor(authService: AuthService, userService: UserService, songService: SongService, adminRepository: Repository<Admin>, createAdminProvider: CreateAdminProvider);
    signUp(adminDTO: AdminDTO): Promise<Admin[]>;
    getPlatformStats(): void;
    manageUsers(): void;
    getUser(email: string): Promise<import("../../user/user.entity").User>;
    addSong(): Promise<void>;
    getSongs(): Promise<void>;
    deleteSong(): Promise<void>;
}

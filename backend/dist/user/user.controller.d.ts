import { UserService } from './providers/user.service';
import { UserDTO } from './dtos/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(userDto: UserDTO): Promise<import("./user.entity").User[]>;
    signIn(): string;
    refreshToken(): string;
    getAdminData(): string;
    getAdminById(id: number): string;
    getAllAdmins(): string;
    updateAdminById(id: number, userDto: UserDTO): string;
    deleteAdminById(id: number): string;
    getPlayerData(): string;
    getPlayerById(id: number): string;
    getAllPlayers(): string;
    updatePlayerById(id: number, userDto: UserDTO): string;
    deletePlayerById(id: number): string;
    getViewerData(): string;
    getUserById(id: number): string;
    getAllUsers(): string;
    updateUserById(id: number, userDto: UserDTO): string;
    deleteUserById(id: number): string;
    updateProfile(): string;
}

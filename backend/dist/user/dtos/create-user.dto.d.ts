import { UserRole } from 'src/common/enums/role.enum';
export declare class UserDTO {
    id?: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    tokens: number;
    adminTokens?: number;
    firstname?: string;
    lastname?: string;
    totalScore?: number;
    gamesPlayed?: number;
    gamesWon?: number;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

import { UserRole } from '../common/enums/role.enum';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    tokens: number;
    firstname: string;
    lastname: string;
    totalScore: number;
    gamesPlayed: number;
    gamesWon: number;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    points: number;
}

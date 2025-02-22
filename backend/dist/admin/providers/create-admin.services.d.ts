import { HashingProvider } from '../../user/providers/hashing.provider';
import { Admin } from '../admin.entity';
import { Repository } from 'typeorm';
import { AdminDTO } from '../dtos/create-admin.dto';
export declare class CreateAdminProvider {
    private readonly adminRepository;
    private readonly hashingProvider;
    constructor(adminRepository: Repository<Admin>, hashingProvider: HashingProvider);
    createAdmin(adminDto: AdminDTO): Promise<Admin[]>;
}

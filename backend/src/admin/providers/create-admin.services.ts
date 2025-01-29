import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { HashingProvider } from '../../user/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admin.entity';
import { Repository } from 'typeorm';
import { AdminDTO } from '../dtos/create-admin.dto';

@Injectable()
export class CreateAdminProvider {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createAdmin(adminDto: AdminDTO) {
    // check if admin already exits
    let existingAdmin: Admin;

    try {
      existingAdmin = await this.adminRepository.findOne({
        where: { email: adminDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error processing your request',
        },
      );
    }
    // Handle Error
    if (existingAdmin) {
      throw new BadRequestException('Admin already exist');
    }
    // Create the admin
    let newAdmin = this.adminRepository.create({
      ...adminDto,
      password: await this.hashingProvider.hashPassword(adminDto.password),
    });
    try {
      newAdmin = await this.adminRepository.save(newAdmin);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error processing your request',
        },
      );
    }
    return [newAdmin];
  }
}

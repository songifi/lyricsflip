import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from './../../auth/providers/auth.service';
import { UserService } from 'src/user/providers/user.service';
import { Admin } from '../admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateAdminProvider } from './create-admin.services';
import { AdminDTO } from '../dtos/create-admin.dto';

// Service responsible for handling administrative operations.
@Injectable()
export class AdminService {
  constructor(
      @Inject(forwardRef(() => AuthService))
      private readonly authService: AuthService,
  
      //Inject user service
      private readonly userService: UserService,
      /* 
       * Inject admin repository
       */
      @InjectRepository(Admin)
      private readonly userRepository: Repository<Admin>,
  
      //Inject create user provider
      private readonly createAdminProvider: CreateAdminProvider,
    ) {}



  public async signUp(adminDTO: AdminDTO) {
      // Implement sign up logic
      return await this.createAdminProvider.createAdmin(adminDTO);
    }

  // Retrieve platform statistics.
  getPlatformStats() {
    // Implement get platform stats logic
  }

  // Manage user accounts and permissions.
  manageUsers() {
    // Implement manage users logic
  }

  // Add a new song to the platform.
  addSong() {
    // Implement add song logic
  }
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from './../../auth/providers/auth.service';
import { UserService } from 'src/user/providers/user.service';
import { SongService } from 'src/song/providers/song.service';
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
      private readonly songService: SongService,
      /* 
       * Inject admin repository
       */
      @InjectRepository(Admin)
      private readonly adminRepository: Repository<Admin>,
  
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

  public async getUser(email: string){
    return await this.userService.findUserByEmail(email);
  }

  // Add a new song to the platform.
  public async addSong() {
    // Implement add song logic
    await this.songService.addSong();
  }

  public async getSongs() {
    // Implement add song logic
    await this.songService.getSongs();
  }

  public async deleteSong() {
    // Implement add song logic
    await this.songService.deleteSong();
  }
}

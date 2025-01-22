import { BadRequestException, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        // Inject users Repository Injection
        @InjectRepository(User)
        private readonly usersRepository: UsersRepository<User>,
      ) { }
        
        public async findOneUserByEmail(email: string) {
          
            let user: User | undefined;
    
            try {
                user = await this.usersRepository.findOneBy({
                     email
                });
            } catch (error) {
                throw new RequestTimeoutException(error, {
                    description: "Could not fetch the user"
                });
            }
    
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
    
            return user;
}
}
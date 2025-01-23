import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing-provider';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        // Inject Hashing Provider
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
    ) {}
        
    public async FindOneByEmail(email: string) {
        let user: User | undefined

        try {
        // check if user exist in db
            user = await this.userRepository.findOneBy({email})
        } catch (error) {
            throw new RequestTimeoutException('Unable to process request at the moment. Please try again later', {
                description: 'Error connecting to the database',
                cause: 'possible network error'
            })
        }

        // throw error if user doesn't exist
        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        return user
        // conpare password
    }
}
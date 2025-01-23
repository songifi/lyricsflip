import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUsers(userDto: UserDTO) {
    // check if user already exits
    let existingUser: User;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: userDto.email },
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
    if (existingUser) {
      throw new BadRequestException('User already exist');
    }
    // Create the user
    let newUser = this.userRepository.create({
      ...userDto,
      password: await this.hashingProvider.hashPassword(userDto.password),
    });
    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, Please try later',
        {
          description: 'Error processing your request',
        },
      );
    }
    return [newUser];
  }
}

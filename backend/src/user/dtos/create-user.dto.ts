import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class UserDTO {
  @IsUUID()
  @IsOptional()
  @Expose()
  id?: string; // Optional: Assigned automatically upon creation

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Expose()
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Exclude({ toPlainOnly: true }) // Exclude password when converting the object to plain data
  password: string;

  @IsString()
  @IsOptional()
  @Expose()
  avatar?: string; // Optional: Profile picture URL

  @IsNumber()
  @Min(0, { message: 'Tokens cannot be negative' })
  @Expose()
  tokens: number;

  @IsNumber()
  @Min(0, { message: 'Score cannot be negative' })
  @Expose()
  totalScore: number;

  @IsNumber()
  @Min(0, { message: 'Games played cannot be negative' })
  @Expose()
  gamesPlayed: number;

  @IsNumber()
  @Min(0, { message: 'Games won cannot be negative' })
  @Expose()
  gamesWon: number;

  @Expose()
  createdAt?: Date; // Optional: Automatically set on creation

  @Expose()
  updatedAt?: Date; // Optional: Automatically set on updates
}

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

export class AdminDTO {
  @IsUUID()
  @IsOptional()
  @Expose()
  id?: string; // Optional: Assigned automatically upon creation

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @Expose()
  name: string;

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

  @Expose()
  createdAt?: Date; // Optional: Automatically set on creation

  @Expose()
  updatedAt?: Date; // Optional: Automatically set on updates
}

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

export class PlayerDTO {
  @IsUUID()
  @IsOptional()
  @Expose()
  id?: string;

  @IsString()
  @IsNotEmpty({ message: 'Firstname is required' })
  @Expose()
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Lastname is required' })
  @Expose()
  lastname: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @Expose()
  email: string;

  @Expose()
  createdAt?: Date; 

  @Expose()
  updatedAt?: Date;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsInt, IsUUID, IsOptional, IsBoolean, MinLength, Matches } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid international phone number (e.g., +255234567890)' })
    phone: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  roleIds?: string[];

  
  @IsString()
  @IsNotEmpty()
  branchId: string;
  
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

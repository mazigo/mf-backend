import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsInt, IsUUID, IsOptional, IsBoolean, MinLength } from 'class-validator';
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

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  roleIds?: number[];

  @IsInt()
  @IsOptional()
  companyId?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsString, IsNotEmpty, IsEmail, IsInt, IsUUID, IsOptional, IsBoolean, Matches } from 'class-validator';
export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid international phone number (e.g., +255234567890)' })
  phone?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsInt()
  @IsOptional()
  locationId?: number;

  @IsUUID()
  @IsOptional()
  managerId?: string;

  @IsInt()
  @IsOptional()
  companyId?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

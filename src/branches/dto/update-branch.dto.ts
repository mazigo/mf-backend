import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsString, IsNotEmpty, IsEmail, IsInt, IsUUID, IsOptional, IsBoolean, Matches } from 'class-validator';
export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  locationId?: string; 

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  managerId?: string; 

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}

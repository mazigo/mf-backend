import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsString, IsOptional, IsEmail, IsArray } from 'class-validator';
import { UpdateEmploymentInfoDto } from './update-employment-info.dto';
import { UpdateAdditionalInfoDto } from './update-additional-info.dto';
import { UpdateBankingInfoDto } from './update-banking-info.dto';
import { UpdateNextOfKinInfoDto } from './update-next-of-kin-info.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsOptional()
  national_id?: string;

  @IsString()
  @IsOptional()
  passport_number?: string;

  @IsString()
  @IsOptional()
  marital_status?: string;

  @IsString()
  @IsOptional()
  physical_address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsString()
  @IsOptional()
  adminHierarchyId?: string;

  @IsArray()
  @IsOptional()
  employment?: UpdateEmploymentInfoDto[];

  @IsArray()
  @IsOptional()
  banking?: UpdateBankingInfoDto[];

  @IsArray()
  @IsOptional()
  nextOfKin?: UpdateNextOfKinInfoDto[];

  @IsArray()
  @IsOptional()
  additionalInfo?: UpdateAdditionalInfoDto[];
}

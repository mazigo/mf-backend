import { IsString, IsEmail, IsOptional, IsArray } from "class-validator";
import { CreateEmploymentInfoDto } from "./create-employment-info.dto";
import { CreateAdditionalInfoDto } from "./create-additional-info.dto";
import { CreateBankingInfoDto } from "./create-banking-info.dto";
import { CreateNextOfKinInfoDto } from "./create-next-of-kin-info.dto";

export class CreateCustomerDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  dob: string;

  @IsString()
  national_id: string;

  @IsString()
  @IsOptional()
  passport_number: string;

  @IsString()
  marital_status: string;

  @IsString()
  physical_address: string;

  @IsString()
  phone: string;

  @IsString()
  companyId: string; // ID of the existing Company

  @IsString()
  adminHierarchyId: string; // ID of the existing AdminHierarchy

  @IsArray()
  @IsOptional()
  employment: CreateEmploymentInfoDto[];

  @IsArray()
  @IsOptional()
  banking: CreateBankingInfoDto[];

  @IsArray()
  @IsOptional()
  nextOfKin: CreateNextOfKinInfoDto[];

  @IsArray()
  @IsOptional()
  additionalInfo: CreateAdditionalInfoDto[];

}

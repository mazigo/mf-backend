import { IsString, IsNotEmpty, IsEmail, IsInt, IsUUID, IsOptional, IsBoolean, Matches } from 'class-validator';
export class CreateBranchDto {
   @IsString()
  name: string;

  @IsString()
  @IsOptional()
  locationId?: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  managerId?: string; 

  @IsString()
  companyId: string; 

  @IsString()
  userId: string; 
}

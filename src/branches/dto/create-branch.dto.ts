import { IsString, IsNotEmpty, IsEmail, IsInt, IsUUID, IsOptional, IsBoolean, Matches } from 'class-validator';
export class CreateBranchDto {
    @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid international phone number (e.g., +255234567890)' })
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsOptional()
  locationId?: number;

  @IsUUID()
  @IsOptional()
  managerId?: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

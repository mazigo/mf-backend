import { IsString, IsNotEmpty, IsBoolean, IsOptional, Matches } from "class-validator";

export class CreateGuarantorDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    identity: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    relationship: string;

    @IsString()
    @IsNotEmpty()
    monthly_income: number;
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid international phone number (e.g., +255234567890)' })
    phone: string;

    @IsString()
    @IsNotEmpty()
    companyId: string;
    
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdditionalInfoDto {
        @IsString()
        @IsOptional()
        referenceName: string;
    
        @IsString()
        @IsOptional()
        referencePhone: string;
    
        @IsString()
        @IsOptional()
        education_level: string;
    
        @IsString()
        @IsOptional()
        customer_type: string;
    
        @IsString()
        @IsOptional()
        intended_purpose: string;
    
        @IsString()
        @IsNotEmpty()
        customerId: string;
}
import { PartialType } from "@nestjs/mapped-types";
import { CreateAdditionalInfoDto } from "./create-additional-info.dto";
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateAdditionalInfoDto extends PartialType(CreateAdditionalInfoDto) {
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
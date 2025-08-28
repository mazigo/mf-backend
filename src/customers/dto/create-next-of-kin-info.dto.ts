import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNextOfKinInfoDto {
        @IsString()
        kinName: string;
    
        @IsString()
        kinPhone: string;
    
        @IsString()
        relationship: string;
    
        @IsString()
        @IsOptional()
        physical_address: string;
    
        @IsString()
        @IsOptional()
        dependants: string;       
    
        @IsString()
        @IsNotEmpty()
        customerId: string;
}
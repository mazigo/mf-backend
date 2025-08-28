import { PartialType } from "@nestjs/mapped-types";
import { CreateNextOfKinInfoDto } from "./create-next-of-kin-info.dto";
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateNextOfKinInfoDto extends PartialType(CreateNextOfKinInfoDto){
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
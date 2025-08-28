import { PartialType } from "@nestjs/mapped-types";
import { CreateBankingInfoDto } from "./create-banking-info.dto";
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateBankingInfoDto extends PartialType(CreateBankingInfoDto){
     @IsString()
        @IsOptional()
        monthly_income: string;
    
        @IsString()
        @IsOptional()
        source_of_income: string;
    
        @IsString()
        @IsOptional()
        other_source_of_income: string;
    
        @IsString()
        @IsOptional()
        bank_name: string;
    
        @IsString()
        @IsOptional()
        account_number: string;
    
        @IsString()
        @IsOptional()
        mobile_money_number: string;
    
        @IsString()
        @IsOptional()
        mobile_money_provider: string;
    
        @IsString()
        @IsNotEmpty()
        customerId: string;
}
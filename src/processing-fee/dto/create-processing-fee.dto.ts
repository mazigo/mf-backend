import { IsString, IsNotEmpty } from "class-validator";

export class CreateProcessingFeeDto {
        @IsString()
        @IsNotEmpty()
        fee: number; 
    
        @IsString()
        @IsNotEmpty()
        companyId: string;
}

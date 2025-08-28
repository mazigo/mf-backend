import { IsString, IsNotEmpty } from "class-validator";

export class CreateInterestRateDto {
    @IsString()
    @IsNotEmpty()
    rate: number; 

    @IsString()
    @IsNotEmpty()
    companyId: string;
}

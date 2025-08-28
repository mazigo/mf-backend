import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmploymentInfoDto {
    @IsString()
    @IsOptional()
    occupation: string;

    @IsString()
    @IsOptional()
    employment_status: string;

    @IsString()
    @IsOptional()
    employer: string;

    @IsString()
    @IsOptional()
    business_name: string;

    @IsString()
    @IsOptional()
    business_type: string;

    @IsString()
    @IsOptional()
    business_age: string;

    @IsString()
    @IsNotEmpty()
    customerId: string;
}
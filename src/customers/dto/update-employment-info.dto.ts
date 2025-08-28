import { PartialType } from "@nestjs/mapped-types";
import { CreateEmploymentInfoDto } from "./create-employment-info.dto";
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateEmploymentInfoDto extends PartialType(CreateEmploymentInfoDto){
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
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class CreateInterestTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

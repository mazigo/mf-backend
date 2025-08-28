import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanTypeDto } from './create-loan-type.dto';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateLoanTypeDto extends PartialType(CreateLoanTypeDto) {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

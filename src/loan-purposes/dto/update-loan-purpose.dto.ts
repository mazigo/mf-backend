import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanPurposeDto } from './create-loan-purpose.dto';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateLoanPurposeDto extends PartialType(CreateLoanPurposeDto) {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

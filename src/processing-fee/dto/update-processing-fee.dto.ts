import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessingFeeDto } from './create-processing-fee.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProcessingFeeDto extends PartialType(CreateProcessingFeeDto) {
    @IsString()
    @IsNotEmpty()
    fee: number; 

    @IsString()
    @IsNotEmpty()
    companyId: string;
}

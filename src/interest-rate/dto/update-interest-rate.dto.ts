import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestRateDto } from './create-interest-rate.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateInterestRateDto extends PartialType(CreateInterestRateDto) {

    @IsString()
    @IsNotEmpty()
    rate: number; 

    @IsString()
    @IsNotEmpty()
    companyId: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentTypeDto } from './create-payment-type.dto';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePaymentTypeDto extends PartialType(CreatePaymentTypeDto) {
    @IsString()
        @IsNotEmpty()
        name: string;
    
        @IsBoolean()
        @IsOptional()
        is_active?: boolean;
}

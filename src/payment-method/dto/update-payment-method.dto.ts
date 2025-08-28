import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {
    @IsString()
        @IsNotEmpty()
        name: string;
    
        @IsBoolean()
        @IsOptional()
        is_active?: boolean;
}

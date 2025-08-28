import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestTypeDto } from './create-interest-type.dto';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateInterestTypeDto extends PartialType(CreateInterestTypeDto) {
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

import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class CreatePaymentTypeDto {
    @IsString()
              @IsNotEmpty()
              name: string;
            
              @IsBoolean()
              @IsOptional()
              is_active?: boolean;
}

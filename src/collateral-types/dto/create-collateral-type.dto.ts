import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class CreateCollateralTypeDto {
      @IsString()
      @IsNotEmpty()
      name: string;
    
      @IsBoolean()
      @IsOptional()
      is_active?: boolean;
}

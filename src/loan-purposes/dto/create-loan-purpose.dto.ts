import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

export class CreateLoanPurposeDto {
          @IsString()
          @IsNotEmpty()
          name: string;
        
          @IsBoolean()
          @IsOptional()
          is_active?: boolean;
}

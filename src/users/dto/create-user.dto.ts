import { IsString, IsNotEmpty, IsEmail, IsArray, IsInt, IsUUID, IsOptional, IsBoolean, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  roleIds?: number[];

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

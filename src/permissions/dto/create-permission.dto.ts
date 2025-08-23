import { IsString, IsNotEmpty, IsArray, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  roleIds?: number[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

import { IsString, IsNotEmpty, IsArray, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateRoleDto {
@IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  permissionIds?: number[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

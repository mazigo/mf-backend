import { IsString, IsNotEmpty, IsArray, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateRoleDto {
@IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  permissionIds?: string[];
  
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  userIds?: string[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

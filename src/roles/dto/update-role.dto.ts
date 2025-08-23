import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsString, IsNotEmpty, IsArray, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  permissionIds?: number[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

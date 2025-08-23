import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { IsString, IsNotEmpty, IsArray, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  roleIds?: number[];

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

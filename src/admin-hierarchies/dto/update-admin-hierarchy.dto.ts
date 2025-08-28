import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminHierarchyDto } from './create-admin-hierarchy.dto';
import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class UpdateAdminHierarchyDto extends PartialType(CreateAdminHierarchyDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: string;

  @IsInt()
  @IsOptional()
  parentId?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  admin_level?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

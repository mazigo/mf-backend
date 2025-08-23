import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateAdminHierarchyDto {
    @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsOptional()
  parentId?: number;

  @IsInt()
  @IsNotEmpty()
  admin_level: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

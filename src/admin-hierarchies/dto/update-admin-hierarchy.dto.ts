import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminHierarchyDto } from './create-admin-hierarchy.dto';

export class UpdateAdminHierarchyDto extends PartialType(CreateAdminHierarchyDto) {}

import { Injectable } from '@nestjs/common';
import { CreateAdminHierarchyDto } from './dto/create-admin-hierarchy.dto';
import { UpdateAdminHierarchyDto } from './dto/update-admin-hierarchy.dto';

@Injectable()
export class AdminHierarchiesService {
  create(createAdminHierarchyDto: CreateAdminHierarchyDto) {
    return 'This action adds a new adminHierarchy';
  }

  findAll() {
    return `This action returns all adminHierarchies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminHierarchy`;
  }

  update(id: number, updateAdminHierarchyDto: UpdateAdminHierarchyDto) {
    return `This action updates a #${id} adminHierarchy`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminHierarchy`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminHierarchyDto } from './dto/create-admin-hierarchy.dto';
import { UpdateAdminHierarchyDto } from './dto/update-admin-hierarchy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminHierarchy } from './entities/admin-hierarchy.entity';

@Injectable()
export class AdminHierarchiesService {
  constructor(
    @InjectRepository(AdminHierarchy)
    private adminHierarchyRepository: Repository<AdminHierarchy>,
  ) {}

  async create(createAdminHierarchyDto: CreateAdminHierarchyDto): Promise<AdminHierarchy> {
    // Fetch Parent AdminHierarchy (optional)
    let parent: AdminHierarchy | null = null;
    if (createAdminHierarchyDto.parentId) {
      parent = await this.adminHierarchyRepository.findOne({
        where: { id: createAdminHierarchyDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException(`Parent AdminHierarchy with ID ${createAdminHierarchyDto.parentId} not found`);
      }
    }

    // Create AdminHierarchy
    const adminHierarchy = new AdminHierarchy();
    adminHierarchy.name = createAdminHierarchyDto.name;
    adminHierarchy.code = createAdminHierarchyDto.code;
    adminHierarchy.parent_id = createAdminHierarchyDto.parentId || null;
    adminHierarchy.admin_level = createAdminHierarchyDto.admin_level;
    adminHierarchy.parent = parent;

    // Save AdminHierarchy
    return this.adminHierarchyRepository.save(adminHierarchy);
  }

  async findAll(): Promise<AdminHierarchy[]> {
    return this.adminHierarchyRepository.find({
      relations: ['parent', 'children', 'customers'],
    });
  }

  async findOne(id: string): Promise<AdminHierarchy> {
    const adminHierarchy = await this.adminHierarchyRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'customers'],
    });
    if (!adminHierarchy) {
      throw new NotFoundException(`AdminHierarchy with ID ${id} not found`);
    }
    return adminHierarchy;
  }

  async update(id: string, updateAdminHierarchyDto: UpdateAdminHierarchyDto): Promise<AdminHierarchy> {
    const adminHierarchy = await this.adminHierarchyRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'customers'],
    });
    if (!adminHierarchy) {
      throw new NotFoundException(`AdminHierarchy with ID ${id} not found`);
    }

    // Update scalar fields
    if (updateAdminHierarchyDto.name) adminHierarchy.name = updateAdminHierarchyDto.name;
    if (updateAdminHierarchyDto.code) adminHierarchy.code = updateAdminHierarchyDto.code;
    if (updateAdminHierarchyDto.admin_level !== undefined) {
      adminHierarchy.admin_level = updateAdminHierarchyDto.admin_level;
    }

    // Update Parent
    if (updateAdminHierarchyDto.parentId !== undefined) {
      if (updateAdminHierarchyDto.parentId === null) {
        adminHierarchy.parent = null;
        adminHierarchy.parent_id = null;
      } else {
        const parent = await this.adminHierarchyRepository.findOne({
          where: { id: updateAdminHierarchyDto.parentId },
        });
        if (!parent) {
          throw new NotFoundException(`Parent AdminHierarchy with ID ${updateAdminHierarchyDto.parentId} not found`);
        }
        adminHierarchy.parent = parent;
        adminHierarchy.parent_id = updateAdminHierarchyDto.parentId;
      }
    }

    return this.adminHierarchyRepository.save(adminHierarchy);
  }

  async remove(id: string): Promise<void> {
    const adminHierarchy = await this.adminHierarchyRepository.findOne({
      where: { id },
      relations: ['children', 'customers'],
    });
    if (!adminHierarchy) {
      throw new NotFoundException(`AdminHierarchy with ID ${id} not found`);
    }

    // Check for children and customers
    if (adminHierarchy.children.length > 0) {
      throw new NotFoundException(`Cannot delete AdminHierarchy with ID ${id} because it has child hierarchies`);
    }
    if (adminHierarchy.customers.length > 0) {
      throw new NotFoundException(`Cannot delete AdminHierarchy with ID ${id} because it has associated customers`);
    }

    await this.adminHierarchyRepository.delete(id);
  }
}

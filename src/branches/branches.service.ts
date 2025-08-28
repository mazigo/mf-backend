import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminHierarchy } from 'src/admin-hierarchies/entities/admin-hierarchy.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(AdminHierarchy)
    private adminHierarchyRepository: Repository<AdminHierarchy>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    // Fetch Company
    const company = await this.companyRepository.findOne({
      where: { id: createBranchDto.companyId },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createBranchDto.companyId} not found`);
    }

    // Fetch AdminHierarchy (optional)
    let location: AdminHierarchy | null = null;
    if (createBranchDto.locationId) {
      location = await this.adminHierarchyRepository.findOne({
        where: { id: createBranchDto.locationId },
      });
      if (!location) {
        throw new NotFoundException(`AdminHierarchy with ID ${createBranchDto.locationId} not found`);
      }
    }

    // Fetch Manager (optional)
    let manager: User | null = null;
    if (createBranchDto.managerId) {
      manager = await this.userRepository.findOne({
        where: { id: createBranchDto.managerId },
      });
      if (!manager) {
        throw new NotFoundException(`User (manager) with ID ${createBranchDto.managerId} not found`);
      }
    }

    // Fetch User (users)
    const user = await this.userRepository.findOne({
      where: { id: createBranchDto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${createBranchDto.userId} not found`);
    }

    // Create Branch
    const branch = new Branch();
    branch.name = createBranchDto.name;
    branch.address = createBranchDto.address;
    branch.phone = createBranchDto.phone;
    branch.email = createBranchDto.email;
    branch.company = company;
    branch.location = location;
    branch.manager = manager;
    branch.users = user;

    // Save Branch
    return this.branchRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return this.branchRepository.find({
      relations: ['company', 'location', 'manager', 'users'],
    });
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id },
      relations: ['company', 'location', 'manager', 'users'],
    });
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id },
      relations: ['company', 'location', 'manager', 'users'],
    });
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }

    // Update scalar fields
    if (updateBranchDto.name) branch.name = updateBranchDto.name;
    if (updateBranchDto.address) branch.address = updateBranchDto.address;
    if (updateBranchDto.phone) branch.phone = updateBranchDto.phone;
    if (updateBranchDto.email) branch.email = updateBranchDto.email;

    // Update Company
    if (updateBranchDto.companyId) {
      const company = await this.companyRepository.findOne({
        where: { id: updateBranchDto.companyId },
      });
      if (!company) {
        throw new NotFoundException(`Company with ID ${updateBranchDto.companyId} not found`);
      }
      branch.company = company;
    }

    // Update AdminHierarchy (location)
    if (updateBranchDto.locationId !== undefined) {
      if (updateBranchDto.locationId === null) {
        branch.location = null;
      } else {
        const location = await this.adminHierarchyRepository.findOne({
          where: { id: updateBranchDto.locationId },
        });
        if (!location) {
          throw new NotFoundException(`AdminHierarchy with ID ${updateBranchDto.locationId} not found`);
        }
        branch.location = location;
      }
    }

    // Update Manager
    if (updateBranchDto.managerId !== undefined) {
      if (updateBranchDto.managerId === null) {
        branch.manager = null;
      } else {
        const manager = await this.userRepository.findOne({
          where: { id: updateBranchDto.managerId },
        });
        if (!manager) {
          throw new NotFoundException(`User (manager) with ID ${updateBranchDto.managerId} not found`);
        }
        branch.manager = manager;
      }
    }

    // Update User (users)
    if (updateBranchDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateBranchDto.userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${updateBranchDto.userId} not found`);
      }
      branch.users = user;
    }

    return this.branchRepository.save(branch);
  }

  async remove(id: string): Promise<void> {
    const branch = await this.branchRepository.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    await this.branchRepository.delete(id);
  }
}

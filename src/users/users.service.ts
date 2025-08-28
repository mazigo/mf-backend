import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Branch } from 'src/branches/entities/branch.entity';

@Injectable()
export class UsersService { 
  usersRepository: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ){}

  async create(createUserDto: CreateUserDto, currentUser: User) {
    const { companyId,branchId,email, roleIds, password, ...rest } = createUserDto;
    // Check if email already exists
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Check if company exists
    const company = await this.companyRepository.findOneBy({ id: companyId });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    // Check if branch exists
    const branch = await this.branchRepository.findOneBy({ id: branchId });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    if (
      currentUser.roles.some(role => role.name === 'company_admin') &&
      currentUser.branch.id !== branchId
    ) {
      throw new ForbiddenException('Company admins can only create users for their own company');
    }

    let roles: Role[] = [];
    if (roleIds && roleIds.length > 0) {
     roles = await this.roleRepository.findByIds(roleIds);
      if (roles.length !== roleIds.length) {
        throw new NotFoundException('One or more roles not found');
      }
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
      branch,
      company,
      roles,
      is_active: createUserDto.is_active ?? true,
    });

    return this.userRepository.save(user);
  }

  async findAll() {
  return this.userRepository.find({
    select: ['id', 'fullName', 'email', 'is_active', 'createdAt', 'updatedAt'],
     relations: ['company','branch', 'roles.permissions']
     });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'fullName', 'email', 'is_active', 'createdAt', 'updatedAt'],
      relations: ['company','branch', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { branchId, roleIds, password, ...rest } = updateUserDto;

    const user = await this.findOne(id);

    if (branchId) {
      const branch = await this.branchRepository.findOneBy({ id: branchId });
      if (!branch) {
        throw new NotFoundException('Company not found');
      }
      user.branch = branch;
    }

    if (roleIds) {
      const roles = await this.roleRepository.findByIds(roleIds);
      if (roles.length !== roleIds.length) {
        throw new NotFoundException('One or more roles not found');
      }
      user.roles = roles;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    Object.assign(user, rest);
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return { message: 'User deleted' };
  }
}

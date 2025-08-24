import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const { companyId,email, roleIds, password, ...rest } = createUserDto;
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
    let roles= [];
    if (roleIds && roleIds.length > 0) {
    let roles = await this.roleRepository.findByIds(roleIds);
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
      company,
      roles,
      is_active: createUserDto.is_active ?? true,
    });

    return this.userRepository.save(user);
  }

  async findAll() {
  return this.userRepository.find({ relations: ['company', 'roles'] });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['company', 'roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { companyId, roleIds, password, ...rest } = updateUserDto;

    const user = await this.findOne(id);

    if (companyId) {
      const company = await this.companyRepository.findOneBy({ id: companyId });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      user.company = company;
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

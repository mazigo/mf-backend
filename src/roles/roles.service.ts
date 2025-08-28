import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesService {
  
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    private usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // async create(name: string): Promise<Role> {
  //   const role = this.rolesRepository.create({ name });
  //   return this.rolesRepository.save(role);
  // }

  async createPermission(name: string): Promise<Permission> {
    const perm = this.permissionsRepository.create({ name });
    return this.permissionsRepository.save(perm);
  }

  async assignRoleToUser(userId: string, roleName: string): Promise<void> {
    const user = await this.usersService.findOne(userId);
    const role = await this.rolesRepository.findOneBy({ name: roleName });
    if (!role) throw new NotFoundException('Role not found');
    user.roles.push(role);
    await this.usersService.usersRepository.save(user); // Assuming usersRepository is public or adjust
  }

  async assignPermissionToRole(roleName: string, permName: string): Promise<void> {
    const role = await this.rolesRepository.findOne({ where: { name: roleName }, relations: ['permissions'] });
    if (!role) throw new NotFoundException('Role not found');
    const perm = await this.permissionsRepository.findOneBy({ name: permName });
    if (!perm) throw new NotFoundException('Permission not found');
    role.permissions.push(perm);
    await this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({ relations: ['permissions', 'users'] });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ 
      where: { id },
      relations: ['permissions', 'users'],
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ 
      where: { name },
      relations: ['permissions', 'users'],
    });
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    return role;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, permissionIds, userIds } = createRoleDto;

    // Check for existing role with same name
    const existingRole = await this.rolesRepository.findOne({ where: { name } });
    if (existingRole) {
      throw new NotFoundException(`Role with name ${name} already exists`);
    }

    // Validate permissions if provided
    let permissions: Permission[] = [];
    if (permissionIds && permissionIds.length > 0) {
      permissions = await this.permissionsRepository.findByIds(permissionIds);
      if (permissions.length !== permissionIds.length) {
        throw new NotFoundException(`One or more permissions not found`);
      }
    }

    // Validate users if provided
    let users: User[] = [];
    if (userIds && userIds.length > 0) {
      users = await this.userRepository.findByIds(userIds);
      if (users.length !== userIds.length) {
        throw new NotFoundException(`One or more users not found`);
      }
    }

    const role = this.rolesRepository.create({
      ...createRoleDto,
      permissions,
      users,
    });
    return await this.rolesRepository.save(role);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    // Check for name uniqueness if updated
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.rolesRepository.findOne({
        where: { name: updateRoleDto.name },
      });
      if (existingRole) {
        throw new NotFoundException(`Role with name ${updateRoleDto.name} already exists`);
      }
    }

    // Validate permissions if provided
    if (updateRoleDto.permissionIds) {
      const permissions = await this.permissionsRepository.findByIds(updateRoleDto.permissionIds);
      if (permissions.length !== updateRoleDto.permissionIds.length) {
        throw new NotFoundException(`One or more permissions not found`);
      }
      role.permissions = permissions;
    }

    // Validate users if provided
    if (updateRoleDto.userIds) {
      const users = await this.userRepository.findByIds(updateRoleDto.userIds);
      if (users.length !== updateRoleDto.userIds.length) {
        throw new NotFoundException(`One or more users not found`);
      }
      role.users = users;
    }

    Object.assign(role, updateRoleDto);
    return await this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    await this.rolesRepository.remove(role);
  }
}

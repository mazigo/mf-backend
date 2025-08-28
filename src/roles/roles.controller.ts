import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { Roles } from './roles.decorator';

@Controller('roles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create-role')
  @Roles('super_admin')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Post('create-permission')
  @Roles('super-admin')
  async createPermission(@Body('name') name: string) {
    return this.rolesService.createPermission(name);
  }

  @Post('assign-role/:userId')
  @Permissions('manage:roles')
  async assignRole(@Param('userId') userId: string, @Body('roleName') roleName: string) {
    return this.rolesService.assignRoleToUser(userId, roleName);
  }

  @Post('assign-permission/:roleName')
  @Permissions('manage:permissions')
  async assignPermission(@Param('roleName') roleName: string, @Body('permName') permName: string) {
    return this.rolesService.assignPermissionToRole(roleName, permName);
  }
  @Get()
    findAll() {
      return this.rolesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.rolesService.findOne(id);
    }
  
    @Patch(':id')
    @Roles('super_admin')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
      return this.rolesService.update(id, updateRoleDto);
    }
  
    @Delete(':id')
    @Roles('super_admin')
    remove(@Param('id') id: string) {
      return this.rolesService.remove(id);
    }
} 



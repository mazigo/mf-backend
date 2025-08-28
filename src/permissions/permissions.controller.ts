import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { PermissionsGuard } from './permissions.guard';
import { Permissions } from './permissions.decorator';

@Controller('permissions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('create:permissions')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('read:permissions')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('read:permissions')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('update:permissions')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('delete:permissions')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}

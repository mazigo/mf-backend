import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminHierarchiesService } from './admin-hierarchies.service';
import { CreateAdminHierarchyDto } from './dto/create-admin-hierarchy.dto';
import { UpdateAdminHierarchyDto } from './dto/update-admin-hierarchy.dto';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('admin-hierarchies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminHierarchiesController {
  constructor(private readonly adminHierarchiesService: AdminHierarchiesService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:admin-hierarchy')
  create(@Body() createAdminHierarchyDto: CreateAdminHierarchyDto) {
    return this.adminHierarchiesService.create(createAdminHierarchyDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:admin-hierarchy')
  findAll() {
    return this.adminHierarchiesService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:admin-hierarchy')
  findOne(@Param('id') id: string) {
    return this.adminHierarchiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:admin-hierarchy')
  update(@Param('id') id: string, @Body() updateAdminHierarchyDto: UpdateAdminHierarchyDto) {
    return this.adminHierarchiesService.update(id, updateAdminHierarchyDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:admin-hierarchy')
  remove(@Param('id') id: string) {
    return this.adminHierarchiesService.remove(id);
  }
}

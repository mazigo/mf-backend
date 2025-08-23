import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminHierarchiesService } from './admin-hierarchies.service';
import { CreateAdminHierarchyDto } from './dto/create-admin-hierarchy.dto';
import { UpdateAdminHierarchyDto } from './dto/update-admin-hierarchy.dto';

@Controller('admin-hierarchies')
export class AdminHierarchiesController {
  constructor(private readonly adminHierarchiesService: AdminHierarchiesService) {}

  @Post()
  create(@Body() createAdminHierarchyDto: CreateAdminHierarchyDto) {
    return this.adminHierarchiesService.create(createAdminHierarchyDto);
  }

  @Get()
  findAll() {
    return this.adminHierarchiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminHierarchiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminHierarchyDto: UpdateAdminHierarchyDto) {
    return this.adminHierarchiesService.update(+id, updateAdminHierarchyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminHierarchiesService.remove(+id);
  }
}

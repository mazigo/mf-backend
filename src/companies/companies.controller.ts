import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('companies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:company')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:company')
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:company')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:company')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:company')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}

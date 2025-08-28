import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LoanTypesService } from './loan-types.service';
import { CreateLoanTypeDto } from './dto/create-loan-type.dto';
import { UpdateLoanTypeDto } from './dto/update-loan-type.dto';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('loan-types')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LoanTypesController {
  constructor(private readonly loanTypesService: LoanTypesService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:loan-type')
  create(@Body() createLoanTypeDto: CreateLoanTypeDto) {
    return this.loanTypesService.create(createLoanTypeDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:loan-type')
  findAll() {
    return this.loanTypesService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:loan-type')
  findOne(@Param('id') id: string) {
    return this.loanTypesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:loan-type')
  update(@Param('id') id: string, @Body() updateLoanTypeDto: UpdateLoanTypeDto) {
    return this.loanTypesService.update(id, updateLoanTypeDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:loan-type')
  remove(@Param('id') id: string) {
    return this.loanTypesService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LoanPurposesService } from './loan-purposes.service';
import { CreateLoanPurposeDto } from './dto/create-loan-purpose.dto';
import { UpdateLoanPurposeDto } from './dto/update-loan-purpose.dto';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('loan-purposes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LoanPurposesController {
  constructor(private readonly loanPurposesService: LoanPurposesService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:loan-purpose')
  create(@Body() createLoanPurposeDto: CreateLoanPurposeDto) {
    return this.loanPurposesService.create(createLoanPurposeDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:loan-purpose')
  findAll() {
    return this.loanPurposesService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:loan-purpose')
  findOne(@Param('id') id: string) {
    return this.loanPurposesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:loan-purpose')
  update(@Param('id') id: string, @Body() updateLoanPurposeDto: UpdateLoanPurposeDto) {
    return this.loanPurposesService.update(id, updateLoanPurposeDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:loan-purpose')
  remove(@Param('id') id: string) {
    return this.loanPurposesService.remove(id);
  }
}

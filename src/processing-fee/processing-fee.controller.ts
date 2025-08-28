import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProcessingFeeService } from './processing-fee.service';
import { CreateProcessingFeeDto } from './dto/create-processing-fee.dto';
import { UpdateProcessingFeeDto } from './dto/update-processing-fee.dto';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('processing-fee')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProcessingFeeController {
  constructor(private readonly processingFeeService: ProcessingFeeService) {}

  @Post()
      @UseGuards(PermissionsGuard)
      @Permissions('create:processing-fee')
  create(@Body() createProcessingFeeDto: CreateProcessingFeeDto) {
    return this.processingFeeService.create(createProcessingFeeDto);
  }

  @Get()
      @UseGuards(PermissionsGuard)
      @Permissions('read:processing-fee')
  findAll() {
    return this.processingFeeService.findAll();
  }

  @Get(':id')
      @UseGuards(PermissionsGuard)
      @Permissions('read:processing-fee')
  findOne(@Param('id') id: string) {
    return this.processingFeeService.findOne(id);
  }

  @Patch(':id')
      @UseGuards(PermissionsGuard)
      @Permissions('update:processing-fee')
  update(@Param('id') id: string, @Body() updateProcessingFeeDto: UpdateProcessingFeeDto) {
    return this.processingFeeService.update(id, updateProcessingFeeDto);
  }

  @Delete(':id')
      @UseGuards(PermissionsGuard)
      @Permissions('delete:processing-fee')
  remove(@Param('id') id: string) {
    return this.processingFeeService.remove(id);
  }
}

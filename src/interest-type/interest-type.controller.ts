import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InterestTypeService } from './interest-type.service';
import { CreateInterestTypeDto } from './dto/create-interest-type.dto';
import { UpdateInterestTypeDto } from './dto/update-interest-type.dto';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('interest-type')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class InterestTypeController {
  constructor(private readonly interestTypeService: InterestTypeService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:interest-type')
  create(@Body() createInterestTypeDto: CreateInterestTypeDto) {
    return this.interestTypeService.create(createInterestTypeDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:interest-type')
  findAll() {
    return this.interestTypeService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:interest-type')
  findOne(@Param('id') id: string) {
    return this.interestTypeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:interest-type')
  update(@Param('id') id: string, @Body() updateInterestTypeDto: UpdateInterestTypeDto) {
    return this.interestTypeService.update(id, updateInterestTypeDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:interest-type')
  remove(@Param('id') id: string) {
    return this.interestTypeService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CollateralTypesService } from './collateral-types.service';
import { CreateCollateralTypeDto } from './dto/create-collateral-type.dto';
import { UpdateCollateralTypeDto } from './dto/update-collateral-type.dto';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('collateral_types')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CollateralTypesController {
  constructor(private readonly collateralTypesService: CollateralTypesService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('create:collateral-type')
  create(@Body() createCollateralTypeDto: CreateCollateralTypeDto) {
    return this.collateralTypesService.create(createCollateralTypeDto);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions('read:collateral-type')
  findAll() {
    return this.collateralTypesService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('read:collateral-type')
  findOne(@Param('id') id: string) {
    return this.collateralTypesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('update:collateral-type')
  update(@Param('id') id: string, @Body() updateCollateralTypeDto: UpdateCollateralTypeDto) {
    return this.collateralTypesService.update(id, updateCollateralTypeDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions('delete:collateral-type')
  remove(@Param('id') id: string) {
    return this.collateralTypesService.remove(id);
  }
}

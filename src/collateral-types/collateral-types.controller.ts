import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollateralTypesService } from './collateral-types.service';
import { CreateCollateralTypeDto } from './dto/create-collateral-type.dto';
import { UpdateCollateralTypeDto } from './dto/update-collateral-type.dto';

@Controller('collateral-types')
export class CollateralTypesController {
  constructor(private readonly collateralTypesService: CollateralTypesService) {}

  @Post()
  create(@Body() createCollateralTypeDto: CreateCollateralTypeDto) {
    return this.collateralTypesService.create(createCollateralTypeDto);
  }

  @Get()
  findAll() {
    return this.collateralTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collateralTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollateralTypeDto: UpdateCollateralTypeDto) {
    return this.collateralTypesService.update(+id, updateCollateralTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collateralTypesService.remove(+id);
  }
}

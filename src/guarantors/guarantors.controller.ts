import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GuarantorsService } from './guarantors.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions } from 'src/permissions/permissions.decorator';

@Controller('guarantors')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GuarantorsController {
  constructor(private readonly guarantorsService: GuarantorsService) {}

  @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('create:guarantor')
  create(@Body() createGuarantorDto: CreateGuarantorDto) {
    return this.guarantorsService.create(createGuarantorDto);
  }

  @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('read:guarantor')
  findAll() {
    return this.guarantorsService.findAll();
  }

  @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('read:guarantor')
  findOne(@Param('id') id: string) {
    return this.guarantorsService.findOne(id);
  }

  @Patch(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('update:guarantor')
  update(@Param('id') id: string, @Body() updateGuarantorDto: UpdateGuarantorDto) {
    return this.guarantorsService.update(id, updateGuarantorDto);
  }

  @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('delete:guarantor')
  remove(@Param('id') id: string) {
    return this.guarantorsService.remove(id);
  }
}

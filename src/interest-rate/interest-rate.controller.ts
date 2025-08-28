import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InterestRateService } from './interest-rate.service';
import { CreateInterestRateDto } from './dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from './dto/update-interest-rate.dto';
import { Permissions } from 'src/permissions/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/permissions/permissions.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('interest-rate')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class InterestRateController {
  constructor(private readonly interestRateService: InterestRateService) {}

  @Post()
    @UseGuards(PermissionsGuard)
    @Permissions('create:interest-rate')
  create(@Body() createInterestRateDto: CreateInterestRateDto) {
    return this.interestRateService.create(createInterestRateDto);
  }

  @Get()
    @UseGuards(PermissionsGuard)
    @Permissions('read:interest-rate')
  findAll() {
    return this.interestRateService.findAll();
  }

  @Get(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('read:interest-rate')
  findOne(@Param('id') id: string) {
    return this.interestRateService.findOne(id);
  }

  @Patch(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('update:interest-rate')
  update(@Param('id') id: string, @Body() updateInterestRateDto: UpdateInterestRateDto) {
    return this.interestRateService.update(id, updateInterestRateDto);
  }

  @Delete(':id')
    @UseGuards(PermissionsGuard)
    @Permissions('delete:interest-rate')
  remove(@Param('id') id: string) {
    return this.interestRateService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterestRateService } from './interest-rate.service';
import { CreateInterestRateDto } from './dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from './dto/update-interest-rate.dto';

@Controller('interest-rate')
export class InterestRateController {
  constructor(private readonly interestRateService: InterestRateService) {}

  @Post()
  create(@Body() createInterestRateDto: CreateInterestRateDto) {
    return this.interestRateService.create(createInterestRateDto);
  }

  @Get()
  findAll() {
    return this.interestRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestRateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterestRateDto: UpdateInterestRateDto) {
    return this.interestRateService.update(id, updateInterestRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestRateService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoanPurposesService } from './loan-purposes.service';
import { CreateLoanPurposeDto } from './dto/create-loan-purpose.dto';
import { UpdateLoanPurposeDto } from './dto/update-loan-purpose.dto';

@Controller('loan-purposes')
export class LoanPurposesController {
  constructor(private readonly loanPurposesService: LoanPurposesService) {}

  @Post()
  create(@Body() createLoanPurposeDto: CreateLoanPurposeDto) {
    return this.loanPurposesService.create(createLoanPurposeDto);
  }

  @Get()
  findAll() {
    return this.loanPurposesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanPurposesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanPurposeDto: UpdateLoanPurposeDto) {
    return this.loanPurposesService.update(+id, updateLoanPurposeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanPurposesService.remove(+id);
  }
}

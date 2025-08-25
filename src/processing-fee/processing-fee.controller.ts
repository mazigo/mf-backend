import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcessingFeeService } from './processing-fee.service';
import { CreateProcessingFeeDto } from './dto/create-processing-fee.dto';
import { UpdateProcessingFeeDto } from './dto/update-processing-fee.dto';

@Controller('processing-fee')
export class ProcessingFeeController {
  constructor(private readonly processingFeeService: ProcessingFeeService) {}

  @Post()
  create(@Body() createProcessingFeeDto: CreateProcessingFeeDto) {
    return this.processingFeeService.create(createProcessingFeeDto);
  }

  @Get()
  findAll() {
    return this.processingFeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processingFeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessingFeeDto: UpdateProcessingFeeDto) {
    return this.processingFeeService.update(+id, updateProcessingFeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processingFeeService.remove(+id);
  }
}

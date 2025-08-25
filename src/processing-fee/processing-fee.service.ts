import { Injectable } from '@nestjs/common';
import { CreateProcessingFeeDto } from './dto/create-processing-fee.dto';
import { UpdateProcessingFeeDto } from './dto/update-processing-fee.dto';

@Injectable()
export class ProcessingFeeService {
  create(createProcessingFeeDto: CreateProcessingFeeDto) {
    return 'This action adds a new processingFee';
  }

  findAll() {
    return `This action returns all processingFee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processingFee`;
  }

  update(id: number, updateProcessingFeeDto: UpdateProcessingFeeDto) {
    return `This action updates a #${id} processingFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} processingFee`;
  }
}

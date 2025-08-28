import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProcessingFeeDto } from './dto/create-processing-fee.dto';
import { UpdateProcessingFeeDto } from './dto/update-processing-fee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Repository } from 'typeorm';
import { ProcessingFee } from './entities/processing-fee.entity';

@Injectable()
export class ProcessingFeeService {
  constructor(
    @InjectRepository(ProcessingFee)
    private readonly processingFeeRepository: Repository<ProcessingFee>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<ProcessingFee[]> {
    return await this.processingFeeRepository.find({ relations: ['company'] });
  }

  async findOne(id: string): Promise<ProcessingFee> {
    const processingFee = await this.processingFeeRepository.findOne({ 
      where: { id },
      relations: ['company'],
    });
    if (!processingFee) {
      throw new NotFoundException(`ProcessingFee with ID ${id} not found`);
    }
    return processingFee;
  }

  async create(createProcessingFeeDto: CreateProcessingFeeDto): Promise<ProcessingFee> {
    const { companyId, fee } = createProcessingFeeDto;

    // Verify company exists
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const processingFee = this.processingFeeRepository.create({
      fee,
      company,
    });
    return await this.processingFeeRepository.save(processingFee);
  }

  async update(id: string, updateProcessingFeeDto: UpdateProcessingFeeDto): Promise<ProcessingFee> {
    const processingFee = await this.findOne(id);

    // Verify company exists if companyId is provided
    if (updateProcessingFeeDto.companyId) {
      const company = await this.companyRepository.findOne({ where: { id: updateProcessingFeeDto.companyId } });
      if (!company) {
        throw new NotFoundException(`Company with ID ${updateProcessingFeeDto.companyId} not found`);
      }
      processingFee.company = company;
    }

    Object.assign(processingFee, updateProcessingFeeDto);
    return await this.processingFeeRepository.save(processingFee);
  }

  async remove(id: string): Promise<void> {
    const processingFee = await this.findOne(id);
    await this.processingFeeRepository.remove(processingFee);
  }
}

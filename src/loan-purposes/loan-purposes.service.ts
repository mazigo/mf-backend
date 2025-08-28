import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanPurposeDto } from './dto/create-loan-purpose.dto';
import { UpdateLoanPurposeDto } from './dto/update-loan-purpose.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanPurpose } from './entities/loan-purpose.entity';

@Injectable()
export class LoanPurposesService {
  constructor(
    @InjectRepository(LoanPurpose)
    private readonly loanPurposeRepository: Repository<LoanPurpose>,
  ) {}

  async findAll(): Promise<LoanPurpose[]> {
    return await this.loanPurposeRepository.find();
  }

  async findOne(id: string): Promise<LoanPurpose> {
    const loanPurpose = await this.loanPurposeRepository.findOne({ where: { id } });
    if (!loanPurpose) {
      throw new NotFoundException(`LoanPurpose with ID ${id} not found`);
    }
    return loanPurpose;
  }

  async findByName(name: string): Promise<LoanPurpose> {
    const loanPurpose = await this.loanPurposeRepository.findOne({ where: { name } });
    if (!loanPurpose) {
      throw new NotFoundException(`LoanPurpose with name ${name} not found`);
    }
    return loanPurpose;
  }

  async create(createLoanPurposeDto: CreateLoanPurposeDto): Promise<LoanPurpose> {
    const existingLoanPurpose = await this.loanPurposeRepository.findOne({
      where: { name: createLoanPurposeDto.name },
    });

    if (existingLoanPurpose) {
      throw new NotFoundException(`LoanPurpose with name ${createLoanPurposeDto.name} already exists`);
    }

    const loanPurpose = this.loanPurposeRepository.create(createLoanPurposeDto);
    return await this.loanPurposeRepository.save(loanPurpose);
  }

  async update(id: string, updateLoanPurposeDto: UpdateLoanPurposeDto): Promise<LoanPurpose> {
    const loanPurpose = await this.findOne(id);
    
    if (updateLoanPurposeDto.name && updateLoanPurposeDto.name !== loanPurpose.name) {
      const existingLoanPurpose = await this.loanPurposeRepository.findOne({
        where: { name: updateLoanPurposeDto.name },
      });
      if (existingLoanPurpose) {
        throw new NotFoundException(`LoanPurpose with name ${updateLoanPurposeDto.name} already exists`);
      }
    }

    Object.assign(loanPurpose, updateLoanPurposeDto);
    return await this.loanPurposeRepository.save(loanPurpose);
  }

  async remove(id: string): Promise<void> {
    const loanPurpose = await this.findOne(id);
    await this.loanPurposeRepository.remove(loanPurpose);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanTypeDto } from './dto/create-loan-type.dto';
import { UpdateLoanTypeDto } from './dto/update-loan-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanType } from './entities/loan-type.entity';

@Injectable()
export class LoanTypesService {
  constructor(
    @InjectRepository(LoanType)
    private readonly loanTypeRepository: Repository<LoanType>,
  ) {}
async findAll(): Promise<LoanType[]> {
    return await this.loanTypeRepository.find();
  }

  async findOne(id: string): Promise<LoanType> {
    const loanType = await this.loanTypeRepository.findOne({ where: { id } });
    if (!loanType) {
      throw new NotFoundException(`LoanType with ID ${id} not found`);
    }
    return loanType;
  }

  async findByName(name: string): Promise<LoanType> {
    const loanType = await this.loanTypeRepository.findOne({ where: { name } });
    if (!loanType) {
      throw new NotFoundException(`LoanType with name ${name} not found`);
    }
    return loanType;
  }

  async create(createLoanTypeDto: CreateLoanTypeDto): Promise<LoanType> {
    const existingLoanType = await this.loanTypeRepository.findOne({
      where: { name: createLoanTypeDto.name },
    });

    if (existingLoanType) {
      throw new NotFoundException(`LoanType with name ${createLoanTypeDto.name} already exists`);
    }

    const loanType = this.loanTypeRepository.create(createLoanTypeDto);
    return await this.loanTypeRepository.save(loanType);
  }

  async update(id: string, updateLoanTypeDto: UpdateLoanTypeDto): Promise<LoanType> {
    const loanType = await this.findOne(id);
    
    if (updateLoanTypeDto.name && updateLoanTypeDto.name !== loanType.name) {
      const existingLoanType = await this.loanTypeRepository.findOne({
        where: { name: updateLoanTypeDto.name },
      });
      if (existingLoanType) {
        throw new NotFoundException(`LoanType with name ${updateLoanTypeDto.name} already exists`);
      }
    }

    Object.assign(loanType, updateLoanTypeDto);
    return await this.loanTypeRepository.save(loanType);
  }

  async remove(id: string): Promise<void> {
    const loanType = await this.findOne(id);
    await this.loanTypeRepository.remove(loanType);
  }
}

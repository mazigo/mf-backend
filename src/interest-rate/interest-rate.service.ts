import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterestRateDto } from './dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from './dto/update-interest-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Repository } from 'typeorm';
import { InterestRate } from './entities/interest-rate.entity';

@Injectable()
export class InterestRateService {
  constructor(
    @InjectRepository(InterestRate)
    private readonly interestRateRepository: Repository<InterestRate>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<InterestRate[]> {
    return await this.interestRateRepository.find({ relations: ['company'] });
  }

  async findOne(id: string): Promise<InterestRate> {
    const interestRate = await this.interestRateRepository.findOne({ 
      where: { id },
      relations: ['company'],
    });
    if (!interestRate) {
      throw new NotFoundException(`InterestRate with ID ${id} not found`);
    }
    return interestRate;
  }

  async create(createInterestRateDto: CreateInterestRateDto): Promise<InterestRate> {
    const { companyId, rate } = createInterestRateDto;

    // Verify company exists
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const interestRate = this.interestRateRepository.create({
      rate,
      company,
    });
    return await this.interestRateRepository.save(interestRate);
  }

  async update(id: string, updateInterestRateDto: UpdateInterestRateDto): Promise<InterestRate> {
    const interestRate = await this.findOne(id);

    // Verify company exists if companyId is provided
    if (updateInterestRateDto.companyId) {
      const company = await this.companyRepository.findOne({ where: { id: updateInterestRateDto.companyId } });
      if (!company) {
        throw new NotFoundException(`Company with ID ${updateInterestRateDto.companyId} not found`);
      }
      interestRate.company = company;
    }

    Object.assign(interestRate, updateInterestRateDto);
    return await this.interestRateRepository.save(interestRate);
  }

  async remove(id: string): Promise<void> {
    const interestRate = await this.findOne(id);
    await this.interestRateRepository.remove(interestRate);
  }
}

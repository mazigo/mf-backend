import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ){}
async  create(createCompanyDto: CreateCompanyDto) {
    const {name} = createCompanyDto;
    // check if company exists
    const existingCompany = await this.companyRepository.findOneBy({ name });
        if (existingCompany) {
          throw new ConflictException('Company name already exists');
        }

    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

async  findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

async  findOne(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({where: {id}});
    if(!company){
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

async  update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
  const comp = await this.findOne(id);
    
    if (updateCompanyDto.name && updateCompanyDto.name !== comp.name) {
      const existingLoanType = await this.companyRepository.findOne({
        where: { name: updateCompanyDto.name },
      });
      if (existingLoanType) {
        throw new NotFoundException(`Company with name ${updateCompanyDto.name} already exists`);
      }
    }

    Object.assign(comp, updateCompanyDto);
    return await this.companyRepository.save(comp);
  }

async remove(id: string): Promise<void> {
    const comp = await this.findOne(id);
    await this.companyRepository.remove(comp);
  }
}

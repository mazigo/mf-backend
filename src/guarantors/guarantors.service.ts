import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { UpdateGuarantorDto } from './dto/update-guarantor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Repository } from 'typeorm';
import { Guarantor } from './entities/guarantor.entity';

@Injectable()
export class GuarantorsService {
  constructor(
    @InjectRepository(Guarantor)
    private readonly guarantorRepository: Repository<Guarantor>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Guarantor[]> {
    return await this.guarantorRepository.find({ relations: ['company'] });
  }

  async findOne(id: string): Promise<Guarantor> {
    const guarantor = await this.guarantorRepository.findOne({ 
      where: { id },
      relations: ['company'],
    });
    if (!guarantor) {
      throw new NotFoundException(`Guarantor with ID ${id} not found`);
    }
    return guarantor;
  }

  async findByIdentity(identity: string): Promise<Guarantor> {
    const guarantor = await this.guarantorRepository.findOne({ 
      where: { identity },
      relations: ['company'],
    });
    if (!guarantor) {
      throw new NotFoundException(`Guarantor with identity ${identity} not found`);
    }
    return guarantor;
  }

  async create(createGuarantorDto: CreateGuarantorDto): Promise<Guarantor> {
    const { companyId, identity } = createGuarantorDto;

    // Check for existing guarantor with same identity
    const existingGuarantor = await this.guarantorRepository.findOne({
      where: { identity },
    });
    if (existingGuarantor) {
      throw new NotFoundException(`Guarantor with identity ${identity} already exists`);
    }

    // Verify company exists
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const guarantor = this.guarantorRepository.create({
      ...createGuarantorDto,
      company,
    });
    return await this.guarantorRepository.save(guarantor);
  }

  async update(id: string, updateGuarantorDto: UpdateGuarantorDto): Promise<Guarantor> {
    const guarantor = await this.findOne(id);

    // Check for identity uniqueness if updated
    if (updateGuarantorDto.identity && updateGuarantorDto.identity !== guarantor.identity) {
      const existingGuarantor = await this.guarantorRepository.findOne({
        where: { identity: updateGuarantorDto.identity },
      });
      if (existingGuarantor) {
        throw new NotFoundException(`Guarantor with identity ${updateGuarantorDto.identity} already exists`);
      }
    }

    // Verify company exists if companyId is provided
    if (updateGuarantorDto.companyId) {
      const company = await this.companyRepository.findOne({ where: { id: updateGuarantorDto.companyId } });
      if (!company) {
        throw new NotFoundException(`Company with ID ${updateGuarantorDto.companyId} not found`);
      }
      guarantor.company = company;
    }

    Object.assign(guarantor, updateGuarantorDto);
    return await this.guarantorRepository.save(guarantor);
  }

  async remove(id: string): Promise<void> {
    const guarantor = await this.findOne(id);
    await this.guarantorRepository.remove(guarantor);
  }
}

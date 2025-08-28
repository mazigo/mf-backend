import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterestTypeDto } from './dto/create-interest-type.dto';
import { UpdateInterestTypeDto } from './dto/update-interest-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterestType } from './entities/interest-type.entity';

@Injectable()
export class InterestTypeService {
  constructor(
    @InjectRepository(InterestType)
    private readonly interestTypeRepository: Repository<InterestType>,
  ) {}

  async findAll(): Promise<InterestType[]> {
    return await this.interestTypeRepository.find();
  }

  async findOne(id: string): Promise<InterestType> {
    const interestType = await this.interestTypeRepository.findOne({ where: { id } });
    if (!interestType) {
      throw new NotFoundException(`InterestType with ID ${id} not found`);
    }
    return interestType;
  }

  async findByName(name: string): Promise<InterestType> {
    const interestType = await this.interestTypeRepository.findOne({ where: { name } });
    if (!interestType) {
      throw new NotFoundException(`InterestType with name ${name} not found`);
    }
    return interestType;
  }

  async findByCode(code: string): Promise<InterestType> {
    const interestType = await this.interestTypeRepository.findOne({ where: { code } });
    if (!interestType) {
      throw new NotFoundException(`InterestType with code ${code} not found`);
    }
    return interestType;
  }

  async create(createInterestTypeDto: CreateInterestTypeDto): Promise<InterestType> {
    const { name, code } = createInterestTypeDto;

    // Check for existing interest type with same name
    const existingByName = await this.interestTypeRepository.findOne({ where: { name } });
    if (existingByName) {
      throw new NotFoundException(`InterestType with name ${name} already exists`);
    }

    // Check for existing interest type with same code
    const existingByCode = await this.interestTypeRepository.findOne({ where: { code } });
    if (existingByCode) {
      throw new NotFoundException(`InterestType with code ${code} already exists`);
    }

    const interestType = this.interestTypeRepository.create(createInterestTypeDto);
    return await this.interestTypeRepository.save(interestType);
  }

  async update(id: string, updateInterestTypeDto: UpdateInterestTypeDto): Promise<InterestType> {
    const interestType = await this.findOne(id);

    // Check for name uniqueness if updated
    if (updateInterestTypeDto.name && updateInterestTypeDto.name !== interestType.name) {
      const existingByName = await this.interestTypeRepository.findOne({
        where: { name: updateInterestTypeDto.name },
      });
      if (existingByName) {
        throw new NotFoundException(`InterestType with name ${updateInterestTypeDto.name} already exists`);
      }
    }

    // Check for code uniqueness if updated
    if (updateInterestTypeDto.code && updateInterestTypeDto.code !== interestType.code) {
      const existingByCode = await this.interestTypeRepository.findOne({
        where: { code: updateInterestTypeDto.code },
      });
      if (existingByCode) {
        throw new NotFoundException(`InterestType with code ${updateInterestTypeDto.code} already exists`);
      }
    }

    Object.assign(interestType, updateInterestTypeDto);
    return await this.interestTypeRepository.save(interestType);
  }

  async remove(id: string): Promise<void> {
    const interestType = await this.findOne(id);
    await this.interestTypeRepository.remove(interestType);
  }
}

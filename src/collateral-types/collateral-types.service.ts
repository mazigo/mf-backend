import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollateralTypeDto } from './dto/create-collateral-type.dto';
import { UpdateCollateralTypeDto } from './dto/update-collateral-type.dto';
import { Repository } from 'typeorm';
import { CollateralType } from './entities/collateral-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollateralTypesService {
  
  constructor(
    @InjectRepository(CollateralType)
    private readonly collateralTypeRepository: Repository<CollateralType>,
  ) {}

  async findAll(): Promise<CollateralType[]> {
    return await this.collateralTypeRepository.find();
  }

  async findOne(id: string): Promise<CollateralType> {
    const collateralType = await this.collateralTypeRepository.findOne({ where: { id } });
    if (!collateralType) {
      throw new NotFoundException(`CollateralType with ID ${id} not found`);
    }
    return collateralType;
  }

  async findByName(name: string): Promise<CollateralType> {
    const collateralType = await this.collateralTypeRepository.findOne({ where: { name } });
    if (!collateralType) {
      throw new NotFoundException(`CollateralType with name ${name} not found`);
    }
    return collateralType;
  }

  async create(createCollateralTypeDto: CreateCollateralTypeDto): Promise<CollateralType> {
    const existingCollateralType = await this.collateralTypeRepository.findOne({
      where: { name: createCollateralTypeDto.name },
    });

    if (existingCollateralType) {
      throw new NotFoundException(`CollateralType with name ${createCollateralTypeDto.name} already exists`);
    }

    const collateralType = this.collateralTypeRepository.create(createCollateralTypeDto);
    return await this.collateralTypeRepository.save(collateralType);
  }

  async update(id: string, updateCollateralTypeDto: UpdateCollateralTypeDto): Promise<CollateralType> {
    const collateralType = await this.findOne(id);
    
    if (updateCollateralTypeDto.name && updateCollateralTypeDto.name !== collateralType.name) {
      const existingCollateralType = await this.collateralTypeRepository.findOne({
        where: { name: updateCollateralTypeDto.name },
      });
      if (existingCollateralType) {
        throw new NotFoundException(`CollateralType with name ${updateCollateralTypeDto.name} already exists`);
      }
    }

    Object.assign(collateralType, updateCollateralTypeDto);
    return await this.collateralTypeRepository.save(collateralType);
  }

  async remove(id: string): Promise<void> {
    const collateralType = await this.findOne(id);
    await this.collateralTypeRepository.remove(collateralType);
  }
}

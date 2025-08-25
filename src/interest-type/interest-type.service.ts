import { Injectable } from '@nestjs/common';
import { CreateInterestTypeDto } from './dto/create-interest-type.dto';
import { UpdateInterestTypeDto } from './dto/update-interest-type.dto';

@Injectable()
export class InterestTypeService {
  create(createInterestTypeDto: CreateInterestTypeDto) {
    return 'This action adds a new interestType';
  }

  findAll() {
    return `This action returns all interestType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interestType`;
  }

  update(id: number, updateInterestTypeDto: UpdateInterestTypeDto) {
    return `This action updates a #${id} interestType`;
  }

  remove(id: number) {
    return `This action removes a #${id} interestType`;
  }
}

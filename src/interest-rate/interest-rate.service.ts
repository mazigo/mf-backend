import { Injectable } from '@nestjs/common';
import { CreateInterestRateDto } from './dto/create-interest-rate.dto';
import { UpdateInterestRateDto } from './dto/update-interest-rate.dto';

@Injectable()
export class InterestRateService {
  create(createInterestRateDto: CreateInterestRateDto) {
    return 'This action adds a new interestRate';
  }

  findAll() {
    return `This action returns all interestRate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interestRate`;
  }

  update(id: number, updateInterestRateDto: UpdateInterestRateDto) {
    return `This action updates a #${id} interestRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} interestRate`;
  }
}

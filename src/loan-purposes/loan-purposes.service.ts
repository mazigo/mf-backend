import { Injectable } from '@nestjs/common';
import { CreateLoanPurposeDto } from './dto/create-loan-purpose.dto';
import { UpdateLoanPurposeDto } from './dto/update-loan-purpose.dto';

@Injectable()
export class LoanPurposesService {
  create(createLoanPurposeDto: CreateLoanPurposeDto) {
    return 'This action adds a new loanPurpose';
  }

  findAll() {
    return `This action returns all loanPurposes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loanPurpose`;
  }

  update(id: number, updateLoanPurposeDto: UpdateLoanPurposeDto) {
    return `This action updates a #${id} loanPurpose`;
  }

  remove(id: number) {
    return `This action removes a #${id} loanPurpose`;
  }
}

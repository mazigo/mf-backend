import { Injectable } from '@nestjs/common';
import { CreateLoanTypeDto } from './dto/create-loan-type.dto';
import { UpdateLoanTypeDto } from './dto/update-loan-type.dto';

@Injectable()
export class LoanTypesService {
  create(createLoanTypeDto: CreateLoanTypeDto) {
    return 'This action adds a new loanType';
  }

  findAll() {
    return `This action returns all loanTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loanType`;
  }

  update(id: number, updateLoanTypeDto: UpdateLoanTypeDto) {
    return `This action updates a #${id} loanType`;
  }

  remove(id: number) {
    return `This action removes a #${id} loanType`;
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanTypeDto } from './create-loan-type.dto';

export class UpdateLoanTypeDto extends PartialType(CreateLoanTypeDto) {}

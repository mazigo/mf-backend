import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanPurposeDto } from './create-loan-purpose.dto';

export class UpdateLoanPurposeDto extends PartialType(CreateLoanPurposeDto) {}

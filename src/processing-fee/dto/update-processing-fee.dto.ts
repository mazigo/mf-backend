import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessingFeeDto } from './create-processing-fee.dto';

export class UpdateProcessingFeeDto extends PartialType(CreateProcessingFeeDto) {}

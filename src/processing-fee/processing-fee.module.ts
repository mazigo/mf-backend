import { Module } from '@nestjs/common';
import { ProcessingFeeService } from './processing-fee.service';
import { ProcessingFeeController } from './processing-fee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessingFee } from './entities/processing-fee.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProcessingFee,Company])],
  controllers: [ProcessingFeeController],
  providers: [ProcessingFeeService],
})
export class ProcessingFeeModule {}

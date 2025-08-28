import { Module } from '@nestjs/common';
import { LoanTypesService } from './loan-types.service';
import { LoanTypesController } from './loan-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanType } from './entities/loan-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LoanType])],
  controllers: [LoanTypesController],
  providers: [LoanTypesService],
})
export class LoanTypesModule {}

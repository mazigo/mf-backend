import { Module } from '@nestjs/common';
import { LoanPurposesService } from './loan-purposes.service';
import { LoanPurposesController } from './loan-purposes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanPurpose } from './entities/loan-purpose.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LoanPurpose])],
  controllers: [LoanPurposesController],
  providers: [LoanPurposesService],
})
export class LoanPurposesModule {}

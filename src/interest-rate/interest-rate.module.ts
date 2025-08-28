import { Module } from '@nestjs/common';
import { InterestRateService } from './interest-rate.service';
import { InterestRateController } from './interest-rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestRate } from './entities/interest-rate.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InterestRate,Company])],
  controllers: [InterestRateController],
  providers: [InterestRateService],
})
export class InterestRateModule {}

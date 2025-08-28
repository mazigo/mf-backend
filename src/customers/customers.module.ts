import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { EmploymentInfo } from './entities/employment.entity';
import { BankingInfo } from './entities/banking.entity';
import { NextOfKinInfo } from './entities/next_of_kin.entity';
import { AdditionalInfo } from './entities/additional.entity';
import { Company } from 'src/companies/entities/company.entity'; 
import { AdminHierarchy } from 'src/admin-hierarchies/entities/admin-hierarchy.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Customer,Company,EmploymentInfo,BankingInfo,NextOfKinInfo,AdditionalInfo,AdminHierarchy])
   ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}

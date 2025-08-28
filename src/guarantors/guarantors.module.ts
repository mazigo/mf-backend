import { Module } from '@nestjs/common';
import { GuarantorsService } from './guarantors.service';
import { GuarantorsController } from './guarantors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guarantor } from './entities/guarantor.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guarantor,Company])],
  controllers: [GuarantorsController],
  providers: [GuarantorsService],
})
export class GuarantorsModule {}

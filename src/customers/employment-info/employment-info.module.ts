import { Module } from '@nestjs/common';
import { EmploymentInfo } from '../entities/employment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([EmploymentInfo])]
})
export class EmploymentInfoModule {}

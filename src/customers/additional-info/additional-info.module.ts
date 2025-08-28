import { Module } from '@nestjs/common';
import { AdditionalInfo } from '../entities/additional.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([AdditionalInfo])]
})
export class AdditionalInfoModule {}

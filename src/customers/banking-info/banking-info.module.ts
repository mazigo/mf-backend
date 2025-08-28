import { Module } from '@nestjs/common';
import { BankingInfo } from '../entities/banking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BankingInfo])]
})
export class BankingInfoModule {}

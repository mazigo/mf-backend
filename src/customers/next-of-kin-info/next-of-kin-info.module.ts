import { Module } from '@nestjs/common';
import { NextOfKinInfo } from '../entities/next_of_kin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([NextOfKinInfo])]
})
export class NextOfKinInfoModule {}

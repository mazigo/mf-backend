import { Module } from '@nestjs/common';
import { InterestTypeService } from './interest-type.service';
import { InterestTypeController } from './interest-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestType } from './entities/interest-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InterestType])],
  controllers: [InterestTypeController],
  providers: [InterestTypeService],
})
export class InterestTypeModule {}

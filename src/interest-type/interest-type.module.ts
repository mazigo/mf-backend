import { Module } from '@nestjs/common';
import { InterestTypeService } from './interest-type.service';
import { InterestTypeController } from './interest-type.controller';

@Module({
  controllers: [InterestTypeController],
  providers: [InterestTypeService],
})
export class InterestTypeModule {}

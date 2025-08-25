import { Module } from '@nestjs/common';
import { InterestRateService } from './interest-rate.service';
import { InterestRateController } from './interest-rate.controller';

@Module({
  controllers: [InterestRateController],
  providers: [InterestRateService],
})
export class InterestRateModule {}

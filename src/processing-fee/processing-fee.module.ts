import { Module } from '@nestjs/common';
import { ProcessingFeeService } from './processing-fee.service';
import { ProcessingFeeController } from './processing-fee.controller';

@Module({
  controllers: [ProcessingFeeController],
  providers: [ProcessingFeeService],
})
export class ProcessingFeeModule {}

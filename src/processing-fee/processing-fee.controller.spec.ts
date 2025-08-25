import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingFeeController } from './processing-fee.controller';
import { ProcessingFeeService } from './processing-fee.service';

describe('ProcessingFeeController', () => {
  let controller: ProcessingFeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessingFeeController],
      providers: [ProcessingFeeService],
    }).compile();

    controller = module.get<ProcessingFeeController>(ProcessingFeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

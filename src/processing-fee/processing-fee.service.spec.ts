import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingFeeService } from './processing-fee.service';

describe('ProcessingFeeService', () => {
  let service: ProcessingFeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingFeeService],
    }).compile();

    service = module.get<ProcessingFeeService>(ProcessingFeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

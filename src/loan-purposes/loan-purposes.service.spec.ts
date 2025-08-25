import { Test, TestingModule } from '@nestjs/testing';
import { LoanPurposesService } from './loan-purposes.service';

describe('LoanPurposesService', () => {
  let service: LoanPurposesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanPurposesService],
    }).compile();

    service = module.get<LoanPurposesService>(LoanPurposesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LoanPurposesController } from './loan-purposes.controller';
import { LoanPurposesService } from './loan-purposes.service';

describe('LoanPurposesController', () => {
  let controller: LoanPurposesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanPurposesController],
      providers: [LoanPurposesService],
    }).compile();

    controller = module.get<LoanPurposesController>(LoanPurposesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

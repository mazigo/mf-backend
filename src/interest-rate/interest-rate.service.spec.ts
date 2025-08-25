import { Test, TestingModule } from '@nestjs/testing';
import { InterestRateService } from './interest-rate.service';

describe('InterestRateService', () => {
  let service: InterestRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestRateService],
    }).compile();

    service = module.get<InterestRateService>(InterestRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

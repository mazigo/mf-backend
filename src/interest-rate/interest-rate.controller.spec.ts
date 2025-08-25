import { Test, TestingModule } from '@nestjs/testing';
import { InterestRateController } from './interest-rate.controller';
import { InterestRateService } from './interest-rate.service';

describe('InterestRateController', () => {
  let controller: InterestRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestRateController],
      providers: [InterestRateService],
    }).compile();

    controller = module.get<InterestRateController>(InterestRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

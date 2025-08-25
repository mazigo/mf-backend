import { Test, TestingModule } from '@nestjs/testing';
import { CollateralTypesService } from './collateral-types.service';

describe('CollateralTypesService', () => {
  let service: CollateralTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollateralTypesService],
    }).compile();

    service = module.get<CollateralTypesService>(CollateralTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CollateralTypesController } from './collateral-types.controller';
import { CollateralTypesService } from './collateral-types.service';

describe('CollateralTypesController', () => {
  let controller: CollateralTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollateralTypesController],
      providers: [CollateralTypesService],
    }).compile();

    controller = module.get<CollateralTypesController>(CollateralTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { InterestTypeController } from './interest-type.controller';
import { InterestTypeService } from './interest-type.service';

describe('InterestTypeController', () => {
  let controller: InterestTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestTypeController],
      providers: [InterestTypeService],
    }).compile();

    controller = module.get<InterestTypeController>(InterestTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

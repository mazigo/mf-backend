import { Test, TestingModule } from '@nestjs/testing';
import { InterestTypeService } from './interest-type.service';

describe('InterestTypeService', () => {
  let service: InterestTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestTypeService],
    }).compile();

    service = module.get<InterestTypeService>(InterestTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

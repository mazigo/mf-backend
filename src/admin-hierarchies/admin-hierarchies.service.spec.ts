import { Test, TestingModule } from '@nestjs/testing';
import { AdminHierarchiesService } from './admin-hierarchies.service';

describe('AdminHierarchiesService', () => {
  let service: AdminHierarchiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminHierarchiesService],
    }).compile();

    service = module.get<AdminHierarchiesService>(AdminHierarchiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

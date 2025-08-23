import { Test, TestingModule } from '@nestjs/testing';
import { AdminHierarchiesController } from './admin-hierarchies.controller';
import { AdminHierarchiesService } from './admin-hierarchies.service';

describe('AdminHierarchiesController', () => {
  let controller: AdminHierarchiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminHierarchiesController],
      providers: [AdminHierarchiesService],
    }).compile();

    controller = module.get<AdminHierarchiesController>(AdminHierarchiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { AdminHierarchiesService } from './admin-hierarchies.service';
import { AdminHierarchiesController } from './admin-hierarchies.controller';

@Module({
  controllers: [AdminHierarchiesController],
  providers: [AdminHierarchiesService],
})
export class AdminHierarchiesModule {}

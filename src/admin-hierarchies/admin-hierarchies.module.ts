import { Module } from '@nestjs/common';
import { AdminHierarchiesService } from './admin-hierarchies.service';
import { AdminHierarchiesController } from './admin-hierarchies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminHierarchy } from './entities/admin-hierarchy.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AdminHierarchy])],
  controllers: [AdminHierarchiesController],
  providers: [AdminHierarchiesService],
})
export class AdminHierarchiesModule {}

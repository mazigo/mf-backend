import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { AdminHierarchy } from 'src/admin-hierarchies/entities/admin-hierarchy.entity';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Branch,AdminHierarchy,User,Company])],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}

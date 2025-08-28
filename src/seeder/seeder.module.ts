import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Company } from 'src/companies/entities/company.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { SeederController } from './seeder.controller';
import { ConfigModule } from '@nestjs/config';
import { Branch } from 'src/branches/entities/branch.entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),TypeOrmModule.forFeature([Company,Branch, User, Role, Permission])],
  providers: [SeederService],
  exports: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}

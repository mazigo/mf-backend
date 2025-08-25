import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Company } from 'src/companies/entities/company.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { SeederController } from './seeder.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),TypeOrmModule.forFeature([Company, User, Role, Permission])],
  providers: [SeederService],
  exports: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}

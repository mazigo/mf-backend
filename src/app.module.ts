import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { CompaniesModule } from './companies/companies.module';
import { BranchesModule } from './branches/branches.module';
import { AdminHierarchiesModule } from './admin-hierarchies/admin-hierarchies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { Company } from './companies/entities/company.entity';
import { Branch } from './branches/entities/branch.entity';
import { AdminHierarchy } from './admin-hierarchies/entities/admin-hierarchy.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService)=>({
        type:'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT',5432),
        username: configService.get('DB_USERNAME','postgres'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME','mf_db'),
        synchronize: configService.get('DB_SYNC',true),
        entities:[User,Role,Permission,Company,Branch,AdminHierarchy]
      }),
      inject:[ConfigService]
  }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN', '3600s') },
      }),
      inject: [ConfigService],
      global: true,
    }),
  UsersModule,
  RolesModule,
  PermissionsModule,
  CompaniesModule, 
  BranchesModule,
  AdminHierarchiesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

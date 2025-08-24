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
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Branch } from 'src/branches/entities/branch.entity';
import { AdminHierarchy } from './admin-hierarchies/entities/admin-hierarchy.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
      global: true,
    }),
  UsersModule,
  RolesModule,
  PermissionsModule,
  CompaniesModule, 
  BranchesModule,
  AdminHierarchiesModule,
  AuthModule,
  SeederModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(jwtService: JwtService) {
  //   console.log('AppModule initialized with JWT_SECRET:', process.env.JWT_SECRET);
  //   try {
  //     const testPayload = { sub: 'test' };
  //     const token = jwtService.sign(testPayload);
  //     console.log('Test JWT generated in AppModule:', token);
  //   } catch (error) {
  //     console.error('Error signing test JWT in AppModule:', error);
  //   }
  // }
}

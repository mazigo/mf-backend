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
import { CollateralTypesModule } from './collateral-types/collateral-types.module';
import { InterestTypeModule } from './interest-type/interest-type.module';
import { InterestRateModule } from './interest-rate/interest-rate.module';
import { ProcessingFeeModule } from './processing-fee/processing-fee.module';
import { GuarantorsModule } from './guarantors/guarantors.module';
import { CustomersModule } from './customers/customers.module';
import { LoanTypesModule } from './loan-types/loan-types.module';
import { LoanPurposesModule } from './loan-purposes/loan-purposes.module';
import { AdditionalInfoModule } from './customers/additional-info/additional-info.module';
import { BankingInfoModule } from './customers/banking-info/banking-info.module';
import { EmploymentInfoModule } from './customers/employment-info/employment-info.module';
import { NextOfKinInfoModule } from './customers/next-of-kin-info/next-of-kin-info.module';
import { CollateralType } from './collateral-types/entities/collateral-type.entity';
import { Customer } from './customers/entities/customer.entity';
import { AdditionalInfo } from './customers/entities/additional.entity';
import { EmploymentInfo } from './customers/entities/employment.entity';
import { BankingInfo } from './customers/entities/banking.entity';
import { NextOfKinInfo } from './customers/entities/next_of_kin.entity';
import { InterestRate } from './interest-rate/entities/interest-rate.entity';
import { InterestType } from './interest-type/entities/interest-type.entity';
import { Guarantor } from './guarantors/entities/guarantor.entity';
import { ProcessingFee } from './processing-fee/entities/processing-fee.entity';
import { LoanPurpose } from './loan-purposes/entities/loan-purpose.entity';
import { LoanType } from './loan-types/entities/loan-type.entity';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';

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
        entities:[
          User,
          Role,
          Permission,
          Company,
          Branch,
          AdminHierarchy,
          CollateralType,
          Customer,
          AdditionalInfo,
          EmploymentInfo,
          BankingInfo,
          NextOfKinInfo,
          InterestRate,
          InterestType,
          Guarantor,
          ProcessingFee,
          LoanPurpose,
          LoanType,
          
        ]
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
  SeederModule,
  CollateralTypesModule,
  InterestTypeModule,
  InterestRateModule,
  ProcessingFeeModule,
  GuarantorsModule,
  CustomersModule,
  LoanTypesModule,
  LoanPurposesModule,
  BankingInfoModule,
  EmploymentInfoModule,
  NextOfKinInfoModule,
  AdditionalInfoModule,
  PaymentMethodModule,
  PaymentTypeModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
}

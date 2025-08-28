import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminHierarchy } from 'src/admin-hierarchies/entities/admin-hierarchy.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Repository } from 'typeorm';
import { AdditionalInfo } from './entities/additional.entity';
import { BankingInfo } from './entities/banking.entity';
import { Customer } from './entities/customer.entity';
import { EmploymentInfo } from './entities/employment.entity';
import { NextOfKinInfo } from './entities/next_of_kin.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(AdminHierarchy)
    private adminHierarchyRepository: Repository<AdminHierarchy>,
    @InjectRepository(EmploymentInfo)
    private employmentRepository: Repository<EmploymentInfo>,
    @InjectRepository(BankingInfo)
    private bankingRepository: Repository<BankingInfo>,
    @InjectRepository(NextOfKinInfo)
    private nextOfKinRepository: Repository<NextOfKinInfo>,
    @InjectRepository(AdditionalInfo)
    private additionalInfoRepository: Repository<AdditionalInfo>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Fetch Company
    const company = await this.companyRepository.findOne({
      where: { id: createCustomerDto.companyId },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${createCustomerDto.companyId} not found`);
    }

    // Fetch AdminHierarchy
    const adminHierarchy = await this.adminHierarchyRepository.findOne({
      where: { id: createCustomerDto.adminHierarchyId },
    });
    if (!adminHierarchy) {
      throw new NotFoundException(`AdminHierarchy with ID ${createCustomerDto.adminHierarchyId} not found`);
    }

    // Create Customer
    const customer = new Customer();
    customer.fullName = createCustomerDto.fullName;
    customer.email = createCustomerDto.email;
    customer.gender = createCustomerDto.gender;
    customer.dob = createCustomerDto.dob;
    customer.national_id = createCustomerDto.national_id;
    customer.passport_number = createCustomerDto.passport_number;
    customer.marital_status = createCustomerDto.marital_status;
    customer.physical_address = createCustomerDto.physical_address;
    customer.phone = createCustomerDto.phone;
    customer.company = company;
    customer.adminHierarchy = adminHierarchy;

    // Save Customer
    const savedCustomer = await this.customerRepository.save(customer);

    // Create and save EmploymentInfo
    if (createCustomerDto.employment && createCustomerDto.employment.length > 0) {
      const employmentInfos = createCustomerDto.employment.map((empDto) => {
        const employment = new EmploymentInfo();
        employment.employer = empDto.employer;
        employment.employment_status = empDto.employment_status;
        employment.occupation = empDto.occupation;
        employment.business_age = empDto.business_age;
        employment.business_name = empDto.business_name;
        employment.business_type = empDto.business_type;
        employment.customer = savedCustomer;
        return employment;
      });
      await this.employmentRepository.save(employmentInfos);
      savedCustomer.employment = employmentInfos;
    }

    // Create and save BankingInfo
    if (createCustomerDto.banking && createCustomerDto.banking.length > 0) {
      const bankingInfos = createCustomerDto.banking.map((bankDto) => {
        const banking = new BankingInfo();
        banking.monthly_income = bankDto.monthly_income;
        banking.source_of_income = bankDto.source_of_income;
        banking.other_source_of_income = bankDto.other_source_of_income;
        banking.bank_name = bankDto.bank_name;
        banking.account_number = bankDto.account_number;
        banking.mobile_money_number = bankDto.mobile_money_number;
        banking.mobile_money_provider = bankDto.mobile_money_provider;
        banking.customer = savedCustomer;
        return banking;
      });
      await this.bankingRepository.save(bankingInfos);
      savedCustomer.banking = bankingInfos;
    }

    // Create and save NextOfKinInfo
    if (createCustomerDto.nextOfKin && createCustomerDto.nextOfKin.length > 0) {
      const nextOfKinInfos = createCustomerDto.nextOfKin.map((kinDto) => {
        const nextOfKin = new NextOfKinInfo();
        nextOfKin.kinName = kinDto.kinName;
        nextOfKin.kinPhone = kinDto.kinPhone;
        nextOfKin.relationship = kinDto.relationship;
        nextOfKin.physical_address = kinDto.physical_address;
        nextOfKin.dependants = kinDto.dependants;
        nextOfKin.customer = savedCustomer;
        return nextOfKin;
      });
      await this.nextOfKinRepository.save(nextOfKinInfos);
      savedCustomer.nextOfKin = nextOfKinInfos;
    }

    // Create and save AdditionalInfo
    if (createCustomerDto.additionalInfo && createCustomerDto.additionalInfo.length > 0) {
      const additionalInfos = createCustomerDto.additionalInfo.map((addDto) => {
        
        const additionalInfo = new AdditionalInfo();
  
        additionalInfo.referenceName = addDto.referenceName;
        additionalInfo.referencePhone = addDto.referencePhone;
        additionalInfo.education_level = addDto.education_level;
        additionalInfo.customer_type = addDto.customer_type;
        additionalInfo.intended_purpose = addDto.intended_purpose;
        additionalInfo.customer = savedCustomer;
        return additionalInfo;
      });
      await this.additionalInfoRepository.save(additionalInfos);
      savedCustomer.additionalInfo = additionalInfos;
    }

    return savedCustomer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: [
        'company',
        'adminHierarchy',
        'employment',
        'banking',
        'nextOfKin',
        'additionalInfo',
      ],
    });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: [
        'company',
        'adminHierarchy',
        'employment',
        'banking',
        'nextOfKin',
        'additionalInfo',
      ],
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: [
        'company',
        'adminHierarchy',
        'employment',
        'banking',
        'nextOfKin',
        'additionalInfo',
      ],
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    // Update Customer fields
    if (updateCustomerDto.fullName) customer.fullName = updateCustomerDto.fullName;
    if (updateCustomerDto.email) customer.email = updateCustomerDto.email;
    if (updateCustomerDto.gender) customer.gender = updateCustomerDto.gender;
    if (updateCustomerDto.dob) customer.dob = updateCustomerDto.dob;
    if (updateCustomerDto.national_id) customer.national_id = updateCustomerDto.national_id;
    if (updateCustomerDto.passport_number) customer.passport_number = updateCustomerDto.passport_number;
    if (updateCustomerDto.marital_status) customer.marital_status = updateCustomerDto.marital_status;
    if (updateCustomerDto.physical_address) customer.physical_address = updateCustomerDto.physical_address;
    if (updateCustomerDto.phone) customer.phone = updateCustomerDto.phone;

    // Update Company
    if (updateCustomerDto.companyId) {
      const company = await this.companyRepository.findOne({
        where: { id: updateCustomerDto.companyId },
      });
      if (!company) {
        throw new NotFoundException(`Company with ID ${updateCustomerDto.companyId} not found`);
      }
      customer.company = company;
    }

    // Update AdminHierarchy
    if (updateCustomerDto.adminHierarchyId) {
      const adminHierarchy = await this.adminHierarchyRepository.findOne({
        where: { id: updateCustomerDto.adminHierarchyId },
      });
      if (!adminHierarchy) {
        throw new NotFoundException(`AdminHierarchy with ID ${updateCustomerDto.adminHierarchyId} not found`);
      }
      customer.adminHierarchy = adminHierarchy;
    }

    // Update EmploymentInfo
    if (updateCustomerDto.employment && updateCustomerDto.employment.length > 0) {
      // Delete existing employment records
      await this.employmentRepository.delete({ customer: { id } });
      // Create new employment records
      const employmentInfos = updateCustomerDto.employment.map((empDto) => {
        const employment = new EmploymentInfo();
        employment.employer = empDto.employer;
        employment.employment_status = empDto.employment_status;
        employment.occupation = empDto.occupation;
        employment.business_age = empDto.business_age;
        employment.business_name = empDto.business_name;
        employment.business_type = empDto.business_type;
        employment.customer = customer;
        return employment;
      });
      await this.employmentRepository.save(employmentInfos);
      customer.employment = employmentInfos;
    }

    // Update BankingInfo
    if (updateCustomerDto.banking && updateCustomerDto.banking.length > 0) {
      await this.bankingRepository.delete({ customer: { id } });
      const bankingInfos = updateCustomerDto.banking.map((bankDto) => {
        const banking = new BankingInfo();
        banking.monthly_income = bankDto.monthly_income;
        banking.source_of_income = bankDto.source_of_income;
        banking.other_source_of_income = bankDto.other_source_of_income;
        banking.bank_name = bankDto.bank_name;
        banking.account_number = bankDto.account_number;
        banking.mobile_money_number = bankDto.mobile_money_number;
        banking.mobile_money_provider = bankDto.mobile_money_provider;
        banking.customer = customer;
        return banking;
      });
      await this.bankingRepository.save(bankingInfos);
      customer.banking = bankingInfos;
    }

    // Update NextOfKinInfo
    if (updateCustomerDto.nextOfKin && updateCustomerDto.nextOfKin.length > 0) {
      await this.nextOfKinRepository.delete({ customer: { id } });
      const nextOfKinInfos = updateCustomerDto.nextOfKin.map((kinDto) => {
        const nextOfKin = new NextOfKinInfo();
        nextOfKin.kinName = kinDto.kinName;
        nextOfKin.kinPhone = kinDto.kinPhone;
        nextOfKin.relationship = kinDto.relationship;
        nextOfKin.physical_address = kinDto.physical_address;
        nextOfKin.dependants = kinDto.dependants;
        nextOfKin.customer = customer;
        return nextOfKin;
      });
      await this.nextOfKinRepository.save(nextOfKinInfos);
      customer.nextOfKin = nextOfKinInfos;
    }

    // Update AdditionalInfo
    if (updateCustomerDto.additionalInfo && updateCustomerDto.additionalInfo.length > 0) {
      await this.additionalInfoRepository.delete({ customer: { id } });
      const additionalInfos = updateCustomerDto.additionalInfo.map((addDto) => {
        const additionalInfo = new AdditionalInfo();
        additionalInfo.referenceName = addDto.referenceName;
        additionalInfo.referencePhone = addDto.referencePhone;
        additionalInfo.education_level = addDto.education_level;
        additionalInfo.customer_type = addDto.customer_type;
        additionalInfo.intended_purpose = addDto.intended_purpose;
        additionalInfo.customer = customer;
        return additionalInfo;
      });
      await this.additionalInfoRepository.save(additionalInfos);
      customer.additionalInfo = additionalInfos;
    }

    return this.customerRepository.save(customer);
  }

  async delete(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    await this.customerRepository.delete(id);
  }
}

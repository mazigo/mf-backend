import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { User } from "src/users/entities/user.entity";
import { Branch } from 'src/branches/entities/branch.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Guarantor } from 'src/guarantors/entities/guarantor.entity';
import { InterestRate } from 'src/interest-rate/entities/interest-rate.entity';
import { ProcessingFee } from 'src/processing-fee/entities/processing-fee.entity';
import { Customer } from 'src/customers/entities/customer.entity';
@Entity('companies')
export class Company extends BaseEntity{ 
  @Column()
  name: string;

  @OneToMany(() => Branch, (branch) => branch.company)
  branches: Branch[]; 

  @OneToMany(() => Guarantor, (guarantor) => guarantor.company)
  guarantors: Guarantor[]; 

  @OneToMany(() => InterestRate, (rates) => rates.company)
  rates: InterestRate[];

  @OneToMany(() => ProcessingFee, (fees) => fees.company)
  fees: ProcessingFee[];

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Customer,(customer)=>customer.company)
  customers: Customer[];
}

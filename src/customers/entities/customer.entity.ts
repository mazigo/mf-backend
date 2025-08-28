import { AdminHierarchy } from "src/admin-hierarchies/entities/admin-hierarchy.entity";
import { Company } from "src/companies/entities/company.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { EmploymentInfo } from "./employment.entity";
import { BankingInfo } from "./banking.entity";
import { NextOfKinInfo } from "./next_of_kin.entity";
import { AdditionalInfo } from "./additional.entity";
@Entity('customers')
export class Customer extends BaseEntity{
    @Column()
      fullName: string;
    
      @Column()
      email: string;
    
      @Column({nullable:true})
      gender: string; 

      @Column({nullable:true})
      dob: string;
      
      @Column()
      national_id: string; 
    
      @Column({nullable:true})
      passport_number: string;
      
      @Column()
      marital_status: string;
      
      @Column()
      physical_address: string;  

      @Column()
      phone: string; 
    
      @ManyToOne(() => Company, (company) => company.customers)
      @JoinColumn()
      company: Company; 
      
      @OneToOne(() => AdminHierarchy,(adminHierarchy)=>adminHierarchy.customers)
      @JoinColumn() 
      adminHierarchy: AdminHierarchy;

      @OneToMany(() => EmploymentInfo,(employment)=>employment.customer)
      employment: EmploymentInfo[];

      @OneToMany(() => BankingInfo,(banking)=>banking.customer)
      banking: BankingInfo[];

      @OneToMany(() => NextOfKinInfo,(nextOfKin)=>nextOfKin.customer)
      nextOfKin: NextOfKinInfo[];

      @OneToMany(() => AdditionalInfo,(additionalInfo)=>additionalInfo.customer)
      additionalInfo: AdditionalInfo[];
}

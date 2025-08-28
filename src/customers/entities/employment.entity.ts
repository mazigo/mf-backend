import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Customer } from "./customer.entity";
import { Company } from "src/companies/entities/company.entity";

@Entity('employment_info')
export class EmploymentInfo extends BaseEntity{

    @Column({nullable:true})
    occupation: string;

    @Column({nullable:true})
    employment_status: string;

    @Column({nullable:true})
    employer: string;

    @Column({nullable:true})
    business_name: string;

    @Column({nullable:true})
    business_type: string;

    @Column({nullable:true})
    business_age: string;

    @ManyToOne(() => Customer, (customer) => customer.employment)
    @JoinColumn()
    customer: Customer;
}
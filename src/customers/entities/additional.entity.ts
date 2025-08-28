import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Customer } from "./customer.entity";
import { BaseEntity } from "src/utils/base.entity";

@Entity('additional_info')
export class AdditionalInfo extends BaseEntity{
   
    @Column({nullable:true})
    referenceName: string;

    @Column({nullable:true})
    referencePhone: string;

    @Column({nullable:true})
    education_level: string;

    @Column({nullable:true})
    customer_type: string;

    @Column({nullable:true})
    intended_purpose: string;

    @ManyToOne(() => Customer, (customer) => customer.additionalInfo)
    @JoinColumn()
    customer: Customer;
}
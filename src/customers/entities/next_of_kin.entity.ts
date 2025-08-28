import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Customer } from "./customer.entity";
import { BaseEntity } from "src/utils/base.entity";

@Entity('next_of_kin_info')
export class NextOfKinInfo extends BaseEntity{
    
    @Column()
    kinName: string;

    @Column()
    kinPhone: string;

    @Column()
    relationship: string;

    @Column({nullable:true})
    physical_address: string;

    @Column({nullable:true})
    dependants: string;       

    @ManyToOne(() => Customer, (customer) => customer.nextOfKin)
    @JoinColumn()
    customer: Customer;
}
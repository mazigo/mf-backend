import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Customer } from "./customer.entity";
import { BaseEntity } from "src/utils/base.entity";

@Entity('banking_info')
export class BankingInfo extends BaseEntity{

    @Column({nullable:true})
    monthly_income: string;

    @Column({nullable:true})
    source_of_income: string;

    @Column({nullable:true})
    other_source_of_income: string;

    @Column({nullable:true})
    bank_name: string;

    @Column({nullable:true})
    account_number: string;

    @Column({nullable:true})
    mobile_money_number: string;

    @Column({nullable:true})
    mobile_money_provider: string;

    @ManyToOne(() => Customer, (customer) => customer.banking)
    @JoinColumn()
    customer: Customer;
}
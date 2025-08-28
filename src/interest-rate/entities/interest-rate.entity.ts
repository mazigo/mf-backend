import { Company } from "src/companies/entities/company.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
@Entity('interest_rates')
export class InterestRate extends BaseEntity{
@Column()
rate: number;

@ManyToOne(() => Company, (company) => company.rates)
company: Company;
}

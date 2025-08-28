import { Company } from "src/companies/entities/company.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
@Entity('processing_fees')
export class ProcessingFee extends BaseEntity{
    @Column()
    fee: number;
    
    @ManyToOne(() => Company, (company) => company.fees)
    company: Company;
}

import { Company } from "src/companies/entities/company.entity";
import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
@Entity('guarantors')
export class Guarantor extends BaseEntity{
      @Column()
      fullName: string;
    
      @Column()
      identity: string;
    
      @Column()
      address: string;

      @Column()
      relationship: string;

      @Column()
      monthly_income: number;

      @Column()
      phone: string;

      @ManyToOne(() => Company, (company) => company.guarantors)
        company: Company;
}

import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";
@Entity('loan_types')
export class LoanType extends BaseEntity{
    @Column({ unique: true })
    name: string;
}

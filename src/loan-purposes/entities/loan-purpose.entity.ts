import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";
@Entity('loan_purposes')
export class LoanPurpose extends BaseEntity{
    @Column({ unique: true })
    name: string;
}

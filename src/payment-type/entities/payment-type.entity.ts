import { BaseEntity } from "src/utils/base.entity";
import { Column } from "typeorm";

export class PaymentType  extends BaseEntity{
    @Column({ unique: true })
        name: string;
}

import { BaseEntity } from "src/utils/base.entity";
import { Column } from "typeorm";

export class PaymentMethod extends BaseEntity{
    @Column({ unique: true })
            name: string;
}

import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";
@Entity('collateral_types')
export class CollateralType extends BaseEntity{
    @Column({ unique: true })
    name: string;
}

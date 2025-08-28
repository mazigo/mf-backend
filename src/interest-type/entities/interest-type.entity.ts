import { BaseEntity } from "src/utils/base.entity";
import { Column, Entity } from "typeorm";
@Entity('interest_types')
export class InterestType extends BaseEntity{
    @Column({ unique: true })
    name: string;
    @Column({ unique: true })
    code: string;
}

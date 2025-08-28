import { Customer } from 'src/customers/entities/customer.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_hierarchies')
export class AdminHierarchy extends BaseEntity{ 
   
  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ type: 'varchar', nullable: true })
  parent_id: string | null;

  @Column()
  admin_level: number;

  @OneToMany(() => Customer, (customer) => customer.adminHierarchy)
  customers: Customer[];

  @ManyToOne(() => AdminHierarchy, (adminHierarchy) => adminHierarchy.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  parent: AdminHierarchy | null;

  @OneToMany(() => AdminHierarchy, (adminHierarchy) => adminHierarchy.parent)
  children: AdminHierarchy[];
}

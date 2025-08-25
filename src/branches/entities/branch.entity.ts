import { AdminHierarchy } from 'src/admin-hierarchies/entities/admin-hierarchy.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('branches')
export class Branch extends BaseEntity{ 
  @Column()
  name: string;

  @OneToOne(() => AdminHierarchy, { nullable: true })
  @JoinColumn()
  location: AdminHierarchy;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string; 

  @OneToOne(() => User, { nullable: true })
  @JoinColumn() 
  manager: User; 

  @ManyToOne(() => Company, (company) => company.branches)
  company: Company;
}

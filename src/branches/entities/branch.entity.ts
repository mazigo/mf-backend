import { AdminHierarchy } from 'src/admin-hierarchies/entities/admin-hierarchy.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('branches')
export class Branch {

  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ default: true })
  is_active: boolean;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn() 
  manager: User; 

  @ManyToOne(() => Company, (company) => company.branches)
  company: Company;
}

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

  @OneToOne(() => User, { nullable: true }) // nullable: true allows a branch to exist without a user
  @JoinColumn() // This decorator is used on the owning side to create the foreign key column
  manager: User; // This will reference the User entity

  @ManyToOne(() => Company, (company) => company.branches)
  company: Company;
}

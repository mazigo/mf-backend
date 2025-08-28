import { Branch } from 'src/branches/entities/branch.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Entity,Column, ManyToMany,ManyToOne, JoinTable, JoinColumn, OneToOne } from 'typeorm';

@Entity('users')
export class User extends BaseEntity{

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hashed

  @Column()
  phone: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn()
  company: Company;

  @OneToOne(() => Branch, (branch) => branch.users)
  branch: Branch;

}

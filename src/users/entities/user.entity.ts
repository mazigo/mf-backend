import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne, JoinTable } from 'typeorm';
@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hashed

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Company, (company) => company.users)
  company: Company; 

  @Column({ default: true })
  is_active: boolean;
}

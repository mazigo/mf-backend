import { Company } from 'src/companies/entities/company.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne, JoinTable } from 'typeorm';
@Entity('users')
export class User {
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  is_active: boolean;
}

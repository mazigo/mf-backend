import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from "src/users/entities/user.entity";
import { Branch } from 'src/branches/entities/branch.entity';
import { BaseEntity } from 'src/utils/base.entity';
@Entity('companies')
export class Company extends BaseEntity{
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Branch, (branch) => branch.company)
  branches: Branch[];
  @Column({ default: true })
  is_active: boolean;
}

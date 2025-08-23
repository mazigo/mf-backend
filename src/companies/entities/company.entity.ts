import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from "src/users/entities/user.entity";
import { Branch } from 'src/branches/entities/branch.entity';
@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Branch, (branch) => branch.company)
  branches: Branch[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  is_active: boolean;
}

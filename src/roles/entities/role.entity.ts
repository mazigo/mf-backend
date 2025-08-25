import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity{ 
  @Column({ unique: true })
  name: string; // e.g., 'admin', 'user'

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]; 
}

import { Role } from 'src/roles/entities/role.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column({ unique: true })
    name: string; // e.g., 'read:users', 'create:users', 'update:users', 'delete:users'

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[]; 

  @Column({ default: true })
  is_active: boolean;

}



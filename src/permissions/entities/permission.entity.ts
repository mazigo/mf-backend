import { Role } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id : number

    @Column({ unique: true })
    name: string; // e.g., 'read:users', 'create:users', 'update:users', 'delete:users'

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ default: true })
  is_active: boolean;

}



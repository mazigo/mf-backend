import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('admin_hierarchies')
export class AdminHierarchy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  parent_id: number;

  @Column()
  admin_level: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  is_active: boolean;

  // Self-referencing ManyToOne relationship (a hierarchy can have one parent)
  @ManyToOne(() => AdminHierarchy, (adminHierarchy) => adminHierarchy.children, {
    nullable: true,
    onDelete: 'SET NULL', // Optional: Set parent_id to NULL if parent is deleted
  })
  parent: AdminHierarchy;

  // Self-referencing OneToMany relationship (a hierarchy can have many children)
  @OneToMany(() => AdminHierarchy, (adminHierarchy) => adminHierarchy.parent)
  children: AdminHierarchy[];
}

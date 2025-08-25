import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from '../companies/entities/company.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
    constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
async seedInitialData() {
    // Step 1: Seed Permissions
    const permissions = [
      { name: 'create:companies' },
      { name: 'read:companies' },
      { name: 'update:companies' },
      { name: 'delete:companies' },
      { name: 'create:users' },
      { name: 'read:users' },
      { name: 'update:users' },
      { name: 'delete:users' },
      { name: 'assign:roles' },
      { name: 'create:roles' },
      { name: 'read:roles' },
      { name: 'update:roles' },
      { name: 'delete:roles' },
      // Add more permissions as needed
    ];

    const createdPermissions: Permission[] = [];
    for (const perm of permissions) {
      let existingPerm = await this.permissionRepository.findOneBy({ name: perm.name });
      if (!existingPerm) {
        existingPerm = await this.permissionRepository.save(this.permissionRepository.create(perm));
      }
      createdPermissions.push(existingPerm);
    }

    // Step 2: Seed Super Admin Role with all permissions
    let superAdminRole = await this.roleRepository.findOneBy({ name: 'super_admin' });
    if (!superAdminRole) {
      superAdminRole = this.roleRepository.create({
        name: 'super_admin',
        permissions: createdPermissions, // Assign all permissions
        is_active: true,
      });
      await this.roleRepository.save(superAdminRole);
    }

    // Step 3: Seed Company Admin Role with limited permissions
    const companyAdminPermissions = createdPermissions.filter(perm =>
      perm.name.startsWith('read:') || perm.name.startsWith('create:users') || perm.name.startsWith('update:users') || perm.name === 'assign:roles'
    ); // Limited to user management, etc.

    let companyAdminRole = await this.roleRepository.findOneBy({ name: 'company_admin' });
    if (!companyAdminRole) {
      companyAdminRole = this.roleRepository.create({
        name: 'company_admin',
        permissions: companyAdminPermissions,
        is_active: true,
      });
      await this.roleRepository.save(companyAdminRole);
    }

    // Step 4: Seed Initial System Company
    let systemCompany = await this.companyRepository.findOneBy({ name: 'System Company' });
    if (!systemCompany) {
      systemCompany = this.companyRepository.create({
        name: 'System Company',
        is_active: true,
      });
      await this.companyRepository.save(systemCompany);
    }

    // Step 5: Seed Super Admin User
    const superAdminEmail = 'superadmin@example.com';
    let superAdminUser = await this.userRepository.findOneBy({ email: superAdminEmail });
    if (!superAdminUser) {
      const hashedPassword = await bcrypt.hash('supersecurepassword', 10); // Change in production
      superAdminUser = this.userRepository.create({
        fullName: 'Super Admin',
        email: superAdminEmail,
        password: hashedPassword,
        company: systemCompany,
        roles: [superAdminRole],
        is_active: true,
      });
      await this.userRepository.save(superAdminUser);
    }

    console.log('Initial data seeded successfully.');
  }
}

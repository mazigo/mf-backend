import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from '../companies/entities/company.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Branch } from 'src/branches/entities/branch.entity';

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
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}
async seedInitialData() {
    // Step 1: Seed Permissions
    const permissions = [
      { name: 'create:companies',description:'Create companies'},
      { name: 'read:companies',description:'Read companies'},
      { name: 'update:companies' ,description:'Update companies'},
      { name: 'delete:companies',description:'Delete companies'},
      { name: 'create:users',description:'Create users'},
      { name: 'read:users',description:'Read users'},
      { name: 'update:users',description:'Update users'},
      { name: 'delete:users',description:'Delete users'},
      { name: 'assign:roles',description:'Create roles'},
      { name: 'create:roles',description:'Create roles'},
      { name: 'read:roles',description:'Read roles'},
      { name: 'update:roles',description:'Update roles'},
      { name: 'delete:roles',description:'Delete roles'},
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
        description:'Create companies and company admins',
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
        description:'Manage company level setups',
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

    // Step 5: Seed Initial Main branch
    let systemBranch = await this.branchRepository.findOneBy({ name: 'Main' });
    if (!systemBranch) {
      systemBranch = this.branchRepository.create({
        name: 'Main',
        address:'Ntyuka Dodoma',
        phone:'255759003238',
        email:'info@main.com',
        company:systemCompany,
        is_active: true,
      });
      await this.branchRepository.save(systemBranch);
    }

    // Step 6: Seed Super Admin User
    const superAdminEmail = 'superadmin@example.com';
    let superAdminUser = await this.userRepository.findOneBy({ email: superAdminEmail });
    if (!superAdminUser) {
      const hashedPassword = await bcrypt.hash('supersecurepassword', 10); // Change in production
      superAdminUser = this.userRepository.create({
        fullName: 'Super Admin',
        email: superAdminEmail,
        password: hashedPassword,
        branch: systemBranch,
        company:systemCompany,
        phone:'255759003238',
        roles: [superAdminRole],
        is_active: true,
      });
      await this.userRepository.save(superAdminUser);
    }

    console.log('Initial data seeded successfully.');
  }
}

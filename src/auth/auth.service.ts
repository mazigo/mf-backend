import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto){
        const {email,password} = loginDto;

        // find user
        const user = await this.userRepository.findOne({
            where: {email},
            relations:['roles','roles.permissions'] //load roles and permissions
        });
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }
        // verify password
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }
        // generate JWT
        const payload = { sub: user.id, email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user: { id: user.id, fullName: user.fullName, email } };
    }

    async validateUser(userId: string){
        return this.userRepository.findOne({
            where:{id:userId},
            relations:['roles','roles.permissions'],
        });
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './Dto/user.register.dto';
import { UserEntity } from './entities/user.entity';

import * as bcrypt from 'bcrypt'
import { ConflictException } from '@nestjs/common';
import { credetialDTo } from './Dto/credetialDTo';
import { JwtService } from '@nestjs/jwt';
import { userRoleEnum } from 'src/enums/user.role.enum';
@Injectable()
export class UserService {


    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private jwtService: JwtService) {

    }
    async register(userData: UserRegisterDto): Promise<Partial<UserEntity>> {

        const user = await this.userRepo.create({
            ...userData
        })
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, user.salt)
        try {
            await this.userRepo.save(user)
        } catch (e) {
            throw new ConflictException(`le ussername${user.username} et le password ${user.password} `);
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    }

    async login(credetial: credetialDTo) {

        // recuperer le login et le mot de passe
        const { username, password } = credetial

        // verifier est ce qu'il y'a un user et mdp

        const user = await this.userRepo.createQueryBuilder('user')
            .where("user.username=:username or user.email=:username")
            .setParameters({ username })
            .getOne()

        // si not user je declanche une erreur

        if (!user) throw new NotFoundException(' username et pasword erronée')
        // si oui , je verifie est si le mot de passe est correct ou pas 
        const hasedPassword = await bcrypt.hash(password, user.salt);
        if (hasedPassword === user.password) {
            const payload = {
                username: user.username,
                email: user.email,
                role: user.role,
            }
            const token_jwt = this.jwtService.sign(payload)
            return {
                "access_token": token_jwt
            }
        } else {
            //si mdp incorrect je declanche une erreur
            throw new NotFoundException(' username et pasword erronée')
        }
    }

    isOwnerOrAdmin(object: any, user: any) {

        return user.role === userRoleEnum.ADMIN || (object.user && object.user.id === user.id)
    }

}

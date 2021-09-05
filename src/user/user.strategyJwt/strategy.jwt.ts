
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { payloadInterface } from './intercfaceJwt/jwt.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import *as dotenv from 'dotenv'
dotenv.config()

const secret = '122haidara1254'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    async validate(payload: payloadInterface) {
        // je recupere le user
        const user = await this.userRepo.findOne({ username: payload.username })
        // verifie s'il existe ,
        // si oui , alors je le retoure .
        // et authomatquement ce que dans validate est mis dans la request
        if (user) {
            const { password, salt, ...result } = user
            return result;
        } else {
            // je le user n'existe pas je retourne une exception
            throw new UnauthorizedException();
        }

    }
}

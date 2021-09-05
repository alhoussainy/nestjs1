import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { JwtStrategy } from './user.strategyJwt/strategy.jwt';

dotenv.config()

const secret = '122haidara1254'
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.register({
    secret: secret,
    signOptions: {
      expiresIn: 3600
    }
  })],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }

import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { credetialDTo } from './Dto/credetialDTo';
import { UserRegisterDto } from './Dto/user.register.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private UserService: UserService) {

    }

    @Post('register')
    async register(
        @Body() userdata: UserRegisterDto
    ): Promise<Partial<UserEntity>> {
        return await this.UserService.register(userdata)
    }

    @Post('login')
    async login(
        @Body() credetials: credetialDTo
    ) {
        return await this.UserService.login(credetials)
    }
}

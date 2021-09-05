import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userRoleEnum } from 'src/enums/user.role.enum';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AddCvDto } from './Dto/Add-cv.dto';
import { UpdateCvDto } from './Dto/Update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>,
        private userService: UserService
    ) {

        // important : toutes les routes statiques(sans paramettres )    if (user.role === userRoleEnum.ADMIN) {
        // return await this.cvRepository.find()
        //}
        // doivent mis avant celles avec paramettres  
    }

    async getCvs(user: any): Promise<CvEntity[]> {

        if (user.role = userRoleEnum.ADMIN) {
            return await this.cvRepository.find()
        }
        return await this.cvRepository.find({ user })
    }

    async AddCv(cv: AddCvDto, user: any): Promise<CvEntity> {
        const newCv = this.cvRepository.create(cv)
        newCv.user = user
        return await this.cvRepository.save(newCv)
    }

    async UpdateCv(id: number, cv: UpdateCvDto, user: any): Promise<CvEntity> {

        const newCv = await this.cvRepository.preload({
            id,
            ...cv
        })
        if (!newCv) throw new NotFoundException(`le cv de l'id ${id} n'existe pas `)

        if (this.userService.isOwnerOrAdmin(cv, user))
            return await this.cvRepository.save(newCv)
        else
            throw new UnauthorizedException()
    }



    async UpdateCv2(updateCriterie: any, cv: UpdateCvDto) {

        return await this.cvRepository.update(updateCriterie, cv)
    }


    async Delete(id: number) {

        const cvToRemove = await this.cvRepository.findOne(id)

        if (!cvToRemove) throw new NotFoundException(`le cv de l'id ${id} n'existe pas `)

        return await this.cvRepository.remove(cvToRemove)
    }

    async SoftDelete(id: number) {
        const cvToRemove = await this.cvRepository.findOne(id)

        if (!cvToRemove) throw new NotFoundException(`le cv de l'id ${id} n'existe pas `)

        return await this.cvRepository.softRemove(cvToRemove)
    }

    async recover(id: number) {
        const cvToRemove = await this.cvRepository.findOne(id)

        if (!cvToRemove) throw new NotFoundException(`le cv de l'id ${id} n'existe pas `)
        return await this.cvRepository.recover(cvToRemove)
    }

    async findById(id: number, user: any) {

        const cv = await this.cvRepository.findOne(id)

        if (!cv) throw new NotFoundException(`le cv de l'id ${id} n'existe pas `)

        // si on est admin ou si 

        if (this.userService.isOwnerOrAdmin(cv, user))
            return cv
        else
            throw new UnauthorizedException()
    }

    async CvNumberByAge() {

        const qb = this.cvRepository.createQueryBuilder('cv');



    }
}

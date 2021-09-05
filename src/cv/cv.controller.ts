import { Delete, Get, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/user/Guards/guardsJwt';
import { CvService } from './cv.service';
import { AddCvDto } from './Dto/Add-cv.dto';
import { UpdateCvDto } from './Dto/Update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {

    constructor(private cvservice: CvService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllCvs(
        @Req() request: Request
    ): Promise<CvEntity[]> {

        const user = request.user
        console.log(request.user);

        return await this.cvservice.getCvs(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async Addcv(
        @Body() AddCvDto: AddCvDto,
        @User() user): Promise<CvEntity> {

        return await this.cvservice.AddCv(AddCvDto, user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async UpdateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id: number,
        @User() user): Promise<CvEntity> {

        return await this.cvservice.UpdateCv(id, updateCvDto, user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(
        @Param('id', ParseIntPipe) id: number) {
        return await this.cvservice.Delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async Sofremove(
        @Param('id', ParseIntPipe) id: number) {

        return await this.cvservice.SoftDelete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('recover/:id')
    async Recover(
        @Param('id', ParseIntPipe) id: number) {
        return await this.cvservice.recover(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @User() user) {
        return await this.cvservice.findById(id, user)
    }

}

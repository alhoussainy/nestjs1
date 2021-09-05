import { Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { Post, Put } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirstInterceptor } from 'src/interceptors/first.interceptor';
import { AddTestDto } from './DTO/add.test.dto';
import { TestService } from './test.service';

@UseInterceptors(FirstInterceptor)
@Controller('test')
export class TestController {

    constructor(private testService: TestService) { }

    @Get()
    getTest(): any {
        return this.testService.getTest()
    }

    @Get('/:id')
    getTestByid(@Param() mesParams) {
        console.log(mesParams);
        return 'get tes by id'
    }

    @Post()
    creatTest(@Body() newTest: AddTestDto) {
        return this.testService.AddTest(newTest)
    }

    @Put()
    updateTest() {
        console.log('hello depuis test controlller');
        return 'modifier un test '
    }

    @Delete(':id')
    deleteTest(@Param('id', ParseIntPipe) id: number) {
        console.log(typeof id);
        return this.testService.deleteTest(id)
    }

    @Get('v2')
    getTestv2(
        @Req() request: Request,
        @Res() response: Response
    ) {
        console.log('hello depuis test controlller');
        response.status(205);
        return response.json({
            test: 'je suis un json response '
        })
    }

}

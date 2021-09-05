import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Global()
@Module({
    imports: [],
    exports: [],
    controllers: [TestController],
    providers: [TestService],
})
export class testModule {

}
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { AddTestDto } from './DTO/add.test.dto';
import { Test } from './Entities/test.entity';

@Injectable()
export class TestService {

    tests: Test[] = []

    getTest() {
        return this.tests
    }

    AddTest(newTest: AddTestDto): Test {
        const { titre, description } = newTest
        let id: any;
        if (this.tests.length) {
            id = this.tests[this.tests.length - 1].id + 1
        } else {
            id = 1
        }
        const test = {
            id,
            titre,
            description,
            createdAt: new Date()
        }
        this.tests.push(test)

        return test
    }

    deleteTest(id: number) {
        const index = this.tests.findIndex((test) => test.id === id)

        if (index >= 0) {
            this.tests.splice(index, 1)
        } else {
            throw new NotFoundException("ce test est absent en base ");
        }
    }

}

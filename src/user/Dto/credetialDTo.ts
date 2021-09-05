import { IsNotEmpty } from "class-validator";

export class credetialDTo {

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}
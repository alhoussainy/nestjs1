import { Type } from "class-transformer";
import { IsNotEmpty, isNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";
import { UserEntity } from "src/user/entities/user.entity";

export class AddCvDto {


    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(5)
    @Max(10)
    age: number;

    @IsNotEmpty()
    cin: number;

    @IsNotEmpty()
    job: string


    @IsNotEmpty()
    path: string



}
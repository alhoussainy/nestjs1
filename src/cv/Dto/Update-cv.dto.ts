import { Type } from "class-transformer";
import { IsNotEmpty, isNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class UpdateCvDto {


    @IsOptional()
    name: string;

    @IsOptional()
    firstname: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(5)
    @Max(10)
    age: number;

    @IsOptional()
    cin: number;

    @IsOptional()
    job: string


    @IsOptional()
    path: string

}
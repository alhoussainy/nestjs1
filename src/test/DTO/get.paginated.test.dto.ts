import { IsNumber, IsOptional, Min } from "class-validator";

export class getAllTestDto {
    @IsNumber()
    page: number;
    @IsOptional()
    item: number
}
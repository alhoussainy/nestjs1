import { IsString, Min } from "class-validator";

export class AddTestDto {
    @IsString()
    @Min(5, {
        message: 'il doit avoir 5 characeteres min'
    })
    titre: String;
    @IsString()
    description: String
}
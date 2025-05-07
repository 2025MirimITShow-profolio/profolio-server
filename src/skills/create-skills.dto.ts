import { IsString, IsNotEmpty } from "class-validator";

export class CreateSkillsDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    project_id: string[];

    @IsNotEmpty()
    @IsString()
    name: string;
}
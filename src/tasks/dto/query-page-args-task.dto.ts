import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class QueryPageArgsDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}
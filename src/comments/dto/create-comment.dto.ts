import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsNumber()
    task_id: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(1024)
    comment: string;
}

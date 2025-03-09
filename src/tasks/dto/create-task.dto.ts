import { IsDate, IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { StatusType } from "../enums/status-type.enum";
import { PriorityType } from "../enums/priority-type.enum";

export class CreateTaskDto {
        @IsNotEmpty()
        @IsString()
        @MinLength(1)
        @MaxLength(255)
        title: string;

        @IsNotEmpty()
        @IsString()
        @MinLength(1)
        @MaxLength(1024)
        description: string;

        @IsNotEmpty()
        @IsEnum(StatusType)
        @IsOptional()
        status: StatusType;

        @IsNotEmpty()
        @IsEnum(PriorityType)
        priority: PriorityType;

        @IsNotEmpty()
        @IsDate()
        due_date: Date;
}

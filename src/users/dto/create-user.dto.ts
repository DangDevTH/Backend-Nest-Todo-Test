import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @MinLength(3)
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,30}$/, { message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว ประกอบด้วยตัวใหญ่ (A-Z), ตัวเล็ก (a-z), ตัวเลข (0-9), และอักขระพิเศษ (@$!%*?&)' })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,30}$/, { message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว ประกอบด้วยตัวใหญ่ (A-Z), ตัวเล็ก (a-z), ตัวเลข (0-9), และอักขระพิเศษ (@$!%*?&)' })
    password_confirm: string;
}
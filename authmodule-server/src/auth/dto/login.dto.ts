import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter valid email'})
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}
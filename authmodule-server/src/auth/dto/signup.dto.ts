import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter valid email'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, {message:'Password should be minimum 8 characters and must contain 1 letter, number and special characters'})
    readonly password: string;
 }
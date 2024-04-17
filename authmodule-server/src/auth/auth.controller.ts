import { Controller, Request, Post, Get , UseGuards, Body, Res, HttpCode} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // async login(@Request() req){
    //     console.log('[AuthController] login');
    //     return this.authService.login(req.user);
    // }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        console.log('[AuthController] getProfile');
        return req.user;
    }

    @Post('/signUp')
    signUp(@Body() signUpDto: SignUpDto): Promise<{token: string}>{
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    @HttpCode(200)
    login(@Body() loginDto: LoginDto): Promise<{token: string}>{
        
        return this.authService.login(loginDto);
    }
}
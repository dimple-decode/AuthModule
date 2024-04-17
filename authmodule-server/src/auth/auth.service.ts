import { Logger, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService{
    private readonly logger = new Logger(AuthService.name);
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService    
){}

    async signUp(signUpDto: SignUpDto) : Promise<{token: string}>{
        this.logger.log(`[AuthService] Started signUp function, signupDto: ${JSON.stringify(signUpDto)}`);
        const {name, email, password} = signUpDto;
        const hashedPassword = await bcrypt.hash(password,10);
        this.logger.log(`[AuthService] Creating user entry in mongo DB`);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        });
        this.logger.log(`[AuthService] Created user entry in mongo DB`);
        const token = this.jwtService.sign({id: user._id});
        return {token};

    }

    async login(loginDto: LoginDto): Promise<{token: string}>{
        this.logger.log(`[AuthService] Started login function, loginDto: ${JSON.stringify(loginDto)}`);
        const {email, password} = loginDto;

        this.logger.log(`[AuthService] Finding user`);
        const user = await this.userModel.findOne({email});
       
        if(!user){
            throw new UnauthorizedException('Invalid Email or Password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid Email or Password');
        }

        this.logger.log(`[AuthService] User Found`);
        const token = this.jwtService.sign({id:user._id});
        return {token};
    }
}
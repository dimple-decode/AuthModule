import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { appConstants } from 'src/constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports:[
    PassportModule,
    //PassportModule.register({defaultStrategy:'jwt'})
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService)=>{
            return {
                secret: config.get<string>('JWT_SECRET_KEY'),
                signOptions:{expiresIn: config.get<string | number>('JWT_EXPIRATIONTIME')} 
            }
        }
       
        // secret:appConstants.jwtSecret,
        // signOptions: {expiresIn: '10m'}
    })
    ],
    controllers:[AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}
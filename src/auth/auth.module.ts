import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./auth.guard";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./otp.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Otp]),
        UserModule,

         PassportModule.register({defaultStrategy:'jwt'}), 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<any>('JWT_SECRET'),
                signOptions: { expiresIn: '50m' }
        }),
        inject: [ConfigService]
    }),
    ],
    controllers:[AuthController],
    providers:[AuthService,JwtAuthGuard,JwtStrategy],
    exports:[]
})
export class AuthModule{}
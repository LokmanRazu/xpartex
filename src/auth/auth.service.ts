import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/user.request-dto";
import { UserService } from "src/user/user.service";
import { Response } from 'express';
import { LoginRequestDto } from "./dto/login.request-dto";
import { comparePassword } from "utils/utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Otp } from "./otp.entity";
import { Repository } from "typeorm";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {


    constructor(@InjectRepository(Otp) private otpRepository:Repository<Otp>,
     private readonly jwtService: JwtService,
      private userService: UserService,
      private mailerService:MailerService
    ) { }

    async signup(dto: CreateUserDto) {
        console.log('dto', dto);
        await this.userService.create(dto);
    }

    async login(dto: LoginRequestDto, res: Response): Promise<any> {
        let user = await this.userService.findOneByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException('Invalid email or Password')
        }
        let match = await comparePassword(user.password, dto.password)
        if (!match) {
            throw new UnauthorizedException('Invalid email or Password')
        }
        const payload = {
            sub: user.id,
            name: user.firstName,

        }
        console.log('payload', payload);
        const token = await this.jwtService.signAsync(payload,{secret:process.env.JWT_SECRET,expiresIn:'50m'});
        console.log("Tokeeenn", token);
        // res.cookie('access_token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production process.env.NODE_ENV === 'production',
        //     sameSite: 'none', // or 'strict' or 'none' depending on your frontend domain
        //     maxAge: 1000 * 60 * 60 * 24, // 1 day
        // });

        return {
            message: 'Login Successfully',
            token:token
        }
    }

      async generateOtp(email: any): Promise<string> {
    // delete old OTPs for this email
    await this.otpRepository.delete({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const otpRecord = this.otpRepository.create({ email, code: otp, expiresAt });
    await this.otpRepository.save(otpRecord);

    return otp;
  }

    async verifyOtp(email: string, code: string): Promise<boolean> {
    const otpRecord = await this.otpRepository.findOne({ where: { email, code } });

    if (!otpRecord) throw new BadRequestException('Invalid OTP');
    if (otpRecord.expiresAt < new Date()) throw new BadRequestException('OTP expired');

    await this.otpRepository.delete({ id: otpRecord.id });

    return true;
  }

    async sendOtp(to: any, otp: string) {
                console.log(to);

    await this.mailerService.sendMail({
      to,
      subject: 'Your OTP Code',
      text:`Your OTP code is: ${otp}. It will expire in 5 minutes.`
    });
  }
}
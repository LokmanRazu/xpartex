import { Body, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response-dto';
import { CreateUserDto } from 'src/user/dto/user.request-dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LoginRequestDto } from './dto/login.request-dto';
import { SendOtpRequestDto } from './dto/otpVerify.dto';

@Controller({ path: 'auth' })
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiOkResponse({ type: LoginResponseDto })
  async createUser(
    @Body() data: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    return this.authService.login(data, res);
  }

  @Post('signup')
  @ApiOkResponse({ type: String })
  async save(@Body() dto: CreateUserDto): Promise<string> {
    await this.authService.signup(dto);
    return 'Sign UP Successfully';
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req) {
    return req.user;
  }

  @Post('send-otp')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  async sendOtp(@Body() dto: SendOtpRequestDto) {
    const otp = await this.authService.generateOtp(dto.email);
    await this.authService.sendOtp(dto.email, otp);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        otp: { type: 'string', example: '123456' },
      },
      required: ['email', 'otp'],
    },
  })
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    await this.authService.verifyOtp(body.email, body.otp);
    return { message: 'OTP verified successfully' };
  }
}

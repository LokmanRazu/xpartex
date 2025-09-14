// dto/verify-otp.request-dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty() 
  otp:string

}


export class SendOtpRequestDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

}

// user.request-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { userRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '+8801234567890' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ enum: userRole, example: userRole.BUYER })
  @IsEnum(userRole)
  role: userRole;

  @ApiProperty({ example: '123 Main Street, Dhaka' })
  @IsString()
  address: string;

  @ApiProperty({ example: '2025-09-12T10:00:00Z' })
  @IsOptional()
  registrationdate?: Date;
}

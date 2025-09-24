// user.response-dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { userRole } from '../user.entity';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ApiProperty({ enum: userRole })
  @Expose()
  role: userRole;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  registrationdate: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class UserResponseWithPasswordDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  password: string; // ⚠️ hashed password

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ApiProperty({ enum: userRole })
  @Expose()
  role: userRole;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  registrationdate: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

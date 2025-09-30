import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dto/user.response-dto';

export class ProfileResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique Profile ID (UUID)',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Unique username of the user',
    required: false,
  })
  @Expose()
  username?: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address of the user',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: '+8801712345678',
    description: 'Phone number of the user (optional)',
    required: false,
  })
  @Expose()
  phone?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'Profile picture URL (optional)',
    required: false,
  })
  @Expose()
  avatarUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the profile is active',
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the profile is verified',
  })
  @Expose()
  isVerified: boolean;

  @ApiProperty({
    example: '123 Main Street',
    description: 'Full address of the user (optional)',
    required: false,
  })
  @Expose()
  address?: string;

  @ApiProperty({
    example: 'Dhaka',
    description: 'City of the user (optional)',
    required: false,
  })
  @Expose()
  city?: string;

  @ApiProperty({
    example: 'Dhaka Division',
    description: 'State/region of the user (optional)',
    required: false,
  })
  @Expose()
  state?: string;

  @ApiProperty({
    example: '1207',
    description: 'Postal code of the user (optional)',
    required: false,
  })
  @Expose()
  postalCode?: string;

  @ApiProperty({
    example: 'Bangladesh',
    description: 'Country of the user (optional)',
    required: false,
  })
  @Expose()
  country?: string;

  @ApiProperty({
    example: 'male',
    description: 'Gender of the user (optional)',
    required: false,
  })
  @Expose()
  gender?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the user (optional)',
    type: String,
    format: 'date',
    required: false,
  })
  @Expose()
  dateOfBirth?: Date;

  @ApiProperty({
    example: 'Software engineer passionate about coding.',
    description: 'Short biography of the user (optional)',
    required: false,
  })
  @Expose()
  bio?: string;

  @ApiProperty({
    example: 'https://johndoe.com',
    description: 'Personal website (optional)',
    required: false,
  })
  @Expose()
  website?: string;

  @ApiProperty({
    example: '{"facebook": "fb.com/johndoe", "twitter": "twitter.com/johndoe"}',
    description: 'Social links in JSON format (optional)',
    required: false,
  })
  @Expose()
  socialLinks?: string;

  @ApiProperty({
    description: 'The user associated with this profile',
  })
  @Type(() => UserResponseDto)
  @Expose()
  user: UserResponseDto;

  @ApiProperty({
    example: '2025-09-12T10:00:00.000Z',
    description: 'Profile creation timestamp',
    type: String,
    format: 'date-time',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: '2025-09-12T12:30:00.000Z',
    description: 'Profile last update timestamp',
    type: String,
    format: 'date-time',
  })
  @Expose()
  updatedAt: Date;
}

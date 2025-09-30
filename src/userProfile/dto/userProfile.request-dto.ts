import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  IsEmail,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class ProfileRequestDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Unique username of the user',
    required: false,
  })
  @IsString({ message: 'Username must be a string' })
  @IsOptional()
  @MaxLength(50, { message: 'Username must not exceed 50 characters' })
  username?: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: '+8801712345678',
    description: 'Phone number of the user (optional)',
    required: false,
  })
  @IsString({ message: 'Phone must be a string' })
  @IsOptional()
  @MaxLength(20, { message: 'Phone must not exceed 20 characters' })
  phone?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    description: 'Profile picture URL',
    required: false,
  })
  @IsString({ message: 'Avatar URL must be a string' })
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the profile is active',
    required: false,
  })
  @IsBoolean({ message: 'isActive must be a boolean' })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the profile is verified',
    required: false,
  })
  @IsBoolean({ message: 'isVerified must be a boolean' })
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({
    example: '123 Main Street',
    description: 'Full address of the user (optional)',
    required: false,
  })
  @IsString({ message: 'Address must be a string' })
  @IsOptional()
  @MaxLength(255, { message: 'Address must not exceed 255 characters' })
  address?: string;

  @ApiProperty({
    example: 'Dhaka',
    description: 'City of the user (optional)',
    required: false,
  })
  @IsString({ message: 'City must be a string' })
  @IsOptional()
  @MaxLength(100, { message: 'City must not exceed 100 characters' })
  city?: string;

  @ApiProperty({
    example: 'Dhaka Division',
    description: 'State/region of the user (optional)',
    required: false,
  })
  @IsString({ message: 'State must be a string' })
  @IsOptional()
  @MaxLength(100, { message: 'State must not exceed 100 characters' })
  state?: string;

  @ApiProperty({
    example: '1207',
    description: 'Postal code of the user (optional)',
    required: false,
  })
  @IsString({ message: 'Postal code must be a string' })
  @IsOptional()
  @MaxLength(20, { message: 'Postal code must not exceed 20 characters' })
  postalCode?: string;

  @ApiProperty({
    example: 'Bangladesh',
    description: 'Country of the user (optional)',
    required: false,
  })
  @IsString({ message: 'Country must be a string' })
  @IsOptional()
  @MaxLength(100, { message: 'Country must not exceed 100 characters' })
  country?: string;

  @ApiProperty({
    example: 'male',
    description: 'Gender of the user (optional)',
    required: false,
  })
  @IsString({ message: 'Gender must be a string' })
  @IsOptional()
  gender?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the user (optional)',
    required: false,
  })
  @IsDateString({}, { message: 'Date of birth must be a valid date' })
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({
    example: 'Software engineer passionate about coding.',
    description: 'Short biography of the user (optional)',
    required: false,
  })
  @IsString({ message: 'Bio must be a string' })
  @IsOptional()
  @MaxLength(500, { message: 'Bio must not exceed 500 characters' })
  bio?: string;

  @ApiProperty({
    example: 'https://johndoe.com',
    description: 'Personal website (optional)',
    required: false,
  })
  @IsString({ message: 'Website must be a string' })
  @IsOptional()
  website?: string;

  @ApiProperty({
    example: '{"facebook": "fb.com/johndoe", "twitter": "twitter.com/johndoe"}',
    description: 'Social links in JSON format (optional)',
    required: false,
  })
  @IsString({ message: 'Social links must be a string (JSON)' })
  @IsOptional()
  socialLinks?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID (UUID) linked with this profile',
  })
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}

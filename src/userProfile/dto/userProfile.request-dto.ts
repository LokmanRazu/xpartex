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
IsEnum,
IsArray,
} from 'class-validator';
import { Gender } from '../userProfile.entity';

export class ProfileRequestDto {
@ApiProperty({
example: 'johndoe',
description: 'Unique username of the user',
required: false,
})
@IsString({ message: 'Username must be a string' })
@IsOptional()
@MaxLength(36, { message: 'Username must not exceed 36 characters' })
username?: string;

@ApiProperty({
example: '[johndoe@example.com](mailto:johndoe@example.com)',
description: 'Email address of the user',
})
@IsEmail({}, { message: 'Invalid email format' })
@IsNotEmpty({ message: 'Email is required' })
@MaxLength(36, { message: 'Email must not exceed 36 characters' })
email: string;

@ApiProperty({
example: '01712345678',
description: 'Phone number of the user (optional)',
required: false,
})
@IsString({ message: 'Phone must be a string' })
@IsOptional()
@MaxLength(16, { message: 'Phone must not exceed 16 digits' })
phone?: string;

@ApiProperty({
example: '[https://example.com/avatar.png](https://example.com/avatar.png)',
description: 'Profile picture URL',
required: false,
})
@IsString({ message: 'Avatar URL must be a string' })
@IsOptional()
img?: string;

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

@ApiProperty({ example: 'Dhaka', description: 'City of the user (optional)' })
@IsString({ message: 'City must be a string' })
@IsOptional()
@MaxLength(56, { message: 'City must not exceed 56 characters' })
city?: string;

@ApiProperty({ example: 'Dhaka Division', description: 'State/region (optional)' })
@IsString({ message: 'State must be a string' })
@IsOptional()
@MaxLength(56, { message: 'State must not exceed 56 characters' })
state?: string;

@ApiProperty({ example: '1207', description: 'Postal code (optional)' })
@IsString({ message: 'Postal code must be a string' })
@IsOptional()
@MaxLength(56, { message: 'Postal code must not exceed 56 characters' })
postalCode?: string;

@ApiProperty({ example: 'Textile', description: 'Industry segment (optional)' })
@IsString({ message: 'Industry segment must be a string' })
@IsOptional()
@MaxLength(56, { message: 'Industry segment must not exceed 56 characters' })
industrySegment?: string;

@ApiProperty({ example: 'Bangladesh', description: 'Country (optional)' })
@IsString({ message: 'Country must be a string' })
@IsOptional()
@MaxLength(56, { message: 'Country must not exceed 56 characters' })
country?: string;

@ApiProperty({ example: 'Bangladeshi', description: 'Nationality (optional)' })
@IsString({ message: 'Nationality must be a string' })
@IsOptional()
@MaxLength(56, { message: 'Nationality must not exceed 56 characters' })
nationality?: string;

@ApiProperty({ example: 'Software Engineer', description: 'Title (optional)' })
@IsString({ message: 'Title must be a string' })
@IsOptional()
@MaxLength(56, { message: 'Title must not exceed 56 characters' })
title?: string;

@ApiProperty({ example: '5 years in software development', description: 'Experience (optional)' })
@IsString({ message: 'Experience must be a string' })
@IsOptional()
experience?: string;

@ApiProperty({ example: 'male', enum: Gender, description: 'Gender (optional)' })
@IsEnum(Gender, { message: 'Gender must be male, female, or other' })
@IsOptional()
gender?: Gender;

@ApiProperty({ example: '1990-01-01', description: 'Date of birth (optional)' })
@IsDateString({}, { message: 'Date of birth must be a valid date' })
@IsOptional()
dateOfBirth?: Date;

@ApiProperty({ example: 'Passionate about coding.', description: 'Short biography (optional)' })
@IsString({ message: 'Bio must be a string' })
@IsOptional()
bio?: string;

@ApiProperty({ example: ['JavaScript', 'NestJS'], description: 'List of skills (optional)' })
@IsArray({ message: 'Skills must be an array of strings' })
@IsOptional()
skills?: string[];

@ApiProperty({ example: ['English', 'Bangla'], description: 'Languages known (optional)' })
@IsArray({ message: 'Languages must be an array of strings' })
@IsOptional()
languages?: string[];

@ApiProperty({ example: '[https://johndoe.com](https://johndoe.com)', description: 'Personal website (optional)' })
@IsString({ message: 'Website must be a string' })
@IsOptional()
website?: string;

@ApiProperty({ example: '{"facebook": "fb.com/johndoe"}', description: 'Social links in JSON format (optional)' })
@IsString({ message: 'Social links must be a string (JSON)' })
@IsOptional()
socialLinks?: string;

@ApiProperty({ example: 'Dhaka', description: 'Preferred work location (optional)' })
@IsString({ message: 'Preferred work location must be a string' })
@IsOptional()
@MaxLength(56, { message: 'Preferred work location must not exceed 56 characters' })
preferredWorkLocation?: string;

@ApiProperty({ example: 'Remote', description: 'Connection preference (optional)' })
@IsString({ message: 'Connection preference must be a string' })
@IsOptional()
@MaxLength(56, { message: 'Connection preference must not exceed 56 characters' })
connectionPreference?: string;

@ApiProperty({
example: '123e4567-e89b-12d3-a456-426614174000',
description: 'User ID (UUID) linked with this profile',
})
@IsUUID('4', { message: 'User ID must be a valid UUID' })
@IsNotEmpty({ message: 'User ID is required' })
userId: string;
}

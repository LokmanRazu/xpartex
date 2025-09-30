import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CompanyProfileRequestDto {
  @ApiProperty({ example: 'ABC Corporation', description: 'Name of the company' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A leading manufacturer of widgets.', description: 'A short bio of the company' })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'URL of the company logo' })
  @IsString()
  @IsOptional()
  img: string;

  @ApiProperty({ example: 'contact@abccorp.com', description: 'Contact email of the company' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'Contact phone number of the company' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'https://abccorp.com', description: 'Website of the company' })
  @IsString()
  @IsOptional()
  website: string;

  @ApiProperty({ example: '123 Main St, Anytown', description: 'Address of the company' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Anytown', description: 'City where the company is located' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'USA', description: 'Country where the company is located' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'Manufacturing', description: 'Industry the company belongs to' })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({ example: '100-500', description: 'Number of employees in the company' })
  @IsString()
  @IsNotEmpty()
  employeeCount: string;

  @ApiProperty({ example: '10000 units/month', description: 'Production capacity of the company' })
  @IsString()
  @IsNotEmpty()
  productionCapacity: string;

  @ApiProperty({ example: 'c8d8a4a7-2f4e-41e7-a6f2-1234567890ab', description: 'ID of the user creating the profile' })
  @IsUUID()
  @IsNotEmpty()
  createdBy: string;
}

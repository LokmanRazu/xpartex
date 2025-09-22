import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsUUID, IsDateString, MaxLength } from 'class-validator';

export class CreateRfqDto {
  @ApiProperty({ example: 'Request for 500 Steel Bolts', description: 'Title or short description of the RFQ' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  title: string;

  @ApiProperty({ example: 500, description: 'Requested quantity of the product' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsPositive({ message: 'Quantity must be greater than 0' })
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @ApiProperty({ example: 'pcs', description: 'Unit of measurement (e.g., pcs, kg, liters)' })
  @IsString({ message: 'Unit must be a string' })
  @IsNotEmpty({ message: 'Unit is required' })
  @MaxLength(50, { message: 'Unit must not exceed 50 characters' })
  unit: string;

  @ApiProperty({ example: '2025-10-01', description: 'Date when the RFQ is created or required (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'Date must be a valid date string (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'Date is required' })
  date: Date;

  @ApiProperty({ example: 'https://example.com/specifications.pdf', description: 'Optional supporting file (URL or filename)' })
  @IsOptional()
  @IsString({ message: 'File must be a string' })
  @MaxLength(255, { message: 'File path/URL must not exceed 255 characters' })
  file?: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh', description: 'Region or location where the product is needed' })
  @IsString({ message: 'Region must be a string' })
  @IsNotEmpty({ message: 'Region is required' })
  @MaxLength(100, { message: 'Region must not exceed 100 characters' })
  region: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174111', description: 'Buyer ID (UUID)' })
  @IsUUID('4', { message: 'Buyer ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Buyer ID is required' })
  buyerId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174222', description: 'Product ID (UUID)' })
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  IsUUID,
  IsDateString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { RfqStatus } from '../rfq.entity';

export class CreateRfqDto {
  @ApiProperty({
    example: 'Request for 500 Steel Bolts',
    description: 'Title or short description of the RFQ',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  title: string;

  @ApiProperty({ example: RfqStatus.OPEN, enum: RfqStatus, description: 'RFQ status', required: true, default: RfqStatus.OPEN })
  @IsEnum(RfqStatus)
  @IsNotEmpty()
  status?: RfqStatus;

  @ApiProperty({
    example: 500,
    description: 'Requested quantity of the product',
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsPositive({ message: 'Quantity must be greater than 0' })
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @ApiProperty({
    example: 'pcs',
    description: 'Unit of measurement (e.g., pcs, kg, liters)',
  })
  @IsString({ message: 'Unit must be a string' })
  @IsNotEmpty({ message: 'Unit is required' })
  @MaxLength(50, { message: 'Unit must not exceed 50 characters' })
  unit: string;

  @ApiProperty({
    example: '2025-10-01',
    description: 'Date when the RFQ is created or required (YYYY-MM-DD)',
  })
  @IsDateString({}, { message: 'Date must be a Lead time' })
  @IsNotEmpty({ message: 'Date is required' })
  leadTime: string;

  @ApiProperty({
    example: 'https://example.com/specifications.pdf',
    description: 'Optional supporting file (URL or filename)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'File must be a string' })
  @MaxLength(255, { message: 'File path/URL must not exceed 255 characters' })
  file?: string;

  @ApiProperty({
    example: 'Dhaka, Bangladesh',
    description: 'Region or location where the product is needed',
  })
  @IsString({ message: 'Region must be a string' })
  @IsNotEmpty({ message: 'Region is required' })
  @MaxLength(100, { message: 'Region must not exceed 100 characters' })
  region: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174111',
    description: 'Buyer ID (UUID)',
  })
  @IsUUID('4', { message: 'Buyer ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Buyer ID is required' })
  buyerId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174111',
    description: 'Buyer ID (UUID)',
  })
  @IsUUID('4', { message: 'rfqBySelerId ID must be a valid UUID' })
  @IsNotEmpty({ message: 'rfqBySelerId ID is required' })
  rfqBySelerId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174222',
    description: 'Product ID (UUID)',
  })
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: string;

  // ✅ New required fields
  @ApiProperty({
    example: 'FOB, Delivered at Port',
    description: 'Delivery terms agreed between buyer and seller',
  })
  @IsString({ message: 'Delivery terms must be a string' })
  @IsNotEmpty({ message: 'Delivery terms are required' })
  @MaxLength(255, { message: 'Delivery terms must not exceed 255 characters' })
  deliveryTerms: string;

  @ApiProperty({
    example: '50% advance, 50% on delivery',
    description: 'Payment terms for the RFQ',
  })
  @IsString({ message: 'Payment terms must be a string' })
  @IsNotEmpty({ message: 'Payment terms are required' })
  @MaxLength(255, { message: 'Payment terms must not exceed 255 characters' })
  paymentTerms: string;

  @ApiProperty({
    example: '12 months warranty from date of delivery',
    description: 'Warranty period for the requested product',
  })
  @IsString({ message: 'Warranty period must be a string' })
  @IsNotEmpty({ message: 'Warranty period is required' })
  @MaxLength(100, { message: 'Warranty period must not exceed 100 characters' })
  warrantyPeriod: string;

  @ApiProperty({
    example: 'USD',
    description: 'Currency in which the transaction will be made',
  })
  @IsString({ message: 'Currency must be a string' })
  @IsNotEmpty({ message: 'Currency is required' })
  @MaxLength(10, { message: 'Currency must not exceed 10 characters' })
  currency: string;

  @ApiProperty({
    example: '123 Main Street, Dhaka, Bangladesh',
    description: 'Shipping address where goods should be delivered',
  })
  @IsString({ message: 'Shipping address must be a string' })
  @IsNotEmpty({ message: 'Shipping address is required' })
  @MaxLength(255, { message: 'Shipping address must not exceed 255 characters' })
  shippingAddress: string;

  // ✅ Optional field
  @ApiProperty({
    example: 'Handle with care, fragile items',
    description: 'Any special instructions related to the RFQ',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Special instructions must be a string' })
  specialInstructions?: string;
}

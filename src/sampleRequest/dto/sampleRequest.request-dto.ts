import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, IsPositive, MaxLength } from 'class-validator';

export class SampleRequestRequestDto {
  @ApiProperty({
    example: 'Red',
    description: 'Preferred color for the sample (optional)',
    required: false,
  })
  @IsString({ message: 'Color must be a string' })
  @IsOptional()
  @MaxLength(50, { message: 'Color must not exceed 50 characters' })
  color?: string;

  @ApiProperty({
    example: 10,
    description: 'Requested quantity of the sample product',
  })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsPositive({ message: 'Quantity must be greater than 0' })
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @ApiProperty({
    example: 50,
    description: 'Price of the sample product (per unit or total)',
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @ApiProperty({
    example: '123 Main Street, Dhaka, Bangladesh',
    description: 'Shipping address where the sample should be delivered',
  })
  @IsString({ message: 'Shipping address must be a string' })
  @IsNotEmpty({ message: 'Shipping address is required' })
  @MaxLength(255, { message: 'Shipping address must not exceed 255 characters' })
  shippingAddress: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174222',
    description: 'buyerId ID (UUID) for which the sample is requested',
  })
  @IsUUID('4', { message: 'buyerId ID must be a valid UUID' })
  @IsNotEmpty({ message: 'buyerId ID is required' })
  buyerId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174222',
    description: 'Product ID (UUID) for which the sample is requested',
  })
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: string;
}

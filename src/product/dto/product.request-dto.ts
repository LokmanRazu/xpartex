import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Name of the product' })
  @IsString({ message: 'Product name must be a string' })
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @ApiProperty({ example: 'https://example.com/images/iphone15.jpg', description: 'Product image URL' })
  @IsString({ message: 'Image must be a string (URL)' })
  @IsNotEmpty({ message: 'Product image is required' })
  img: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Seller ID (UUID)' })
  @IsString({ message: 'Seller ID must be a string' })
  @IsNotEmpty({ message: 'Seller ID is required' })
  sellerId: string;

  @ApiProperty({ example: 'Smartphone', description: 'Category of the product' })
  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category is required' })
  categoryId: string;

  @ApiProperty({ example: '999.99', description: 'Price of the product (string format)' })
  @IsString({ message: 'Price must be a string' })
  @IsNotEmpty({ message: 'Price is required' })
  price: string;

  @ApiProperty({ example: 100, description: 'Available stock quantity' })
  @IsNumber({}, { message: 'Stock quantity must be a number' })
  @IsPositive({ message: 'Stock quantity must be greater than 0' })
  @IsNotEmpty({ message: 'Stock quantity is required' })
  stockQuantity: number;

  @ApiProperty({ example: 'Latest iPhone model with titanium frame', description: 'Detailed description of the product' })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}

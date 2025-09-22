import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsPositive, 
  IsString, 
  ValidateNested, 
  IsArray 
} from 'class-validator';
import { Type } from 'class-transformer';
import { productType } from '../product.entity';

class ProductDescriptionDto {
  @ApiProperty({ example: '1000' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({ example: 'Black color, 256GB' })
  @IsString({ message: 'Value must be a string' })
  value: string;
}

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
  @IsString({ message: 'Product description must be a string' })
  @IsNotEmpty({ message: 'Product description is required' })
  productDescription: string;

  @ApiProperty({ required: true, enum: productType })
  @IsNotEmpty({ message: 'productType is required' })
  @IsEnum(productType, { message: `productType must be one of: ${Object.values(productType).join(', ')}` })
  productType: productType;

  @ApiProperty({ type: [ProductDescriptionDto], required: false })
  @IsArray({ message: 'Description must be an array' })
  @ValidateNested({ each: true })
  @Type(() => ProductDescriptionDto)
  @IsOptional()
  description?: ProductDescriptionDto[];

  @ApiProperty({ example: 'XL' })
  @IsString({ message: 'Size must be a string' })
  @IsOptional({ message: 'Size is optional' })
  size?: string;

  @ApiProperty({ example: 10 })
  @IsNumber({}, { message: 'MOQ must be a number' })
  @IsOptional({ message: 'MOQ is optional' })
  moq?: number;
}

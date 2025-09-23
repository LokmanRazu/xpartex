import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsPositive, 
  IsString, 
  ValidateNested, 
  IsArray, 
  IsBoolean 
} from 'class-validator';
import { Type } from 'class-transformer';
import { productStatus, productType } from '../product.entity';

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
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/images/iphone15.jpg', description: 'Product image URL' })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Seller ID (UUID)' })
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({ example: 'category-uuid', description: 'Category ID (UUID)' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: '999.99', description: 'Price of the product (string format)' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: 100, description: 'Available stock quantity' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  stockQuantity: number;

  @ApiProperty({ example: 'Latest iPhone model with titanium frame' })
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @ApiProperty({ required: true, enum: productType })
  @IsNotEmpty()
  @IsEnum(productType)
  productType: productType;

  @ApiProperty({ required: true, enum: productStatus,default:productStatus.PUBLISH })
  @IsNotEmpty()
  @IsEnum(productStatus)
  productStatus: productStatus;

  @ApiProperty({ type: [ProductDescriptionDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDescriptionDto)
  @IsOptional()
  description?: ProductDescriptionDto[];

  @ApiProperty({ example: ['XL','L'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  size?: string[];

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  moq?: number;

  // ---------------- New fields ----------------

  @ApiProperty({ example: ['https://example.com/img1.jpg','https://example.com/img2.jpg'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  additionalImages?: string[];

  @ApiProperty({ example: ['electronics', 'smartphone'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: 0.5, description: 'Weight in kg', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  weight?: number;

  @ApiProperty({ example: ['Home Delivery', 'Pickup'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  deliveryOptions?: string[];

  @ApiProperty({ example: 899.99, description: 'Discounted price', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  discountPrice?: number;

  @ApiProperty({ example: ['Black', 'Blue', 'Gold'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colorVariants?: string[];

  @ApiProperty({ example: '7-day return policy', required: false })
  @IsString()
  @IsOptional()
  returnPolicy?: string;

  @ApiProperty({ example: 'Ships in eco-friendly packaging', required: false })
  @IsString()
  @IsOptional()
  packagingDetails?: string;

  @ApiProperty({ example: '7-10 business days', required: false })
  @IsString()
  @IsOptional()
  leadTime?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  negotiablePrice?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  sampleAvailability?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  customBiddingOption?: boolean;
}

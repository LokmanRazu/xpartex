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
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { productStatus, productType } from '../product.entity';
import { productSizeRequestDto } from 'src/wholesale/dto/wholesale.request-dto';

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

  @ApiProperty({ example: 'https://example.com/images/iphone15.jpg', description: 'Product image URL', format: 'binary' })
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

  @ApiProperty({ required: true, enum: productStatus, default: productStatus.PUBLISH })
  @IsNotEmpty()
  @IsEnum(productStatus)
  productStatus: productStatus;

  // ------------------- New Fields -------------------
  @ApiProperty({ example: 'Mobile Accessories', required: false })
  @IsString()
  @IsOptional()
  productSubCategory?: string;

  @ApiProperty({ example: 'HSN12345', required: false })
  @IsString()
  @IsOptional()
  hsnCode?: string;

  @ApiProperty({ example: 'SKU-001', required: false })
  @IsString()
  @IsOptional()
  skuCode?: string;

  @ApiProperty({ example: 'Cotton', required: false })
  @IsString()
  @IsOptional()
  materialType?: string;

  @ApiProperty({ example: '80% Cotton, 20% Polyester', required: false })
  @IsString()
  @IsOptional()
  composition?: string;

  @ApiProperty({ example: '180 GSM', required: false })
  @IsString()
  @IsOptional()
  gsm?: string;

  @ApiProperty({ example: '40s', required: false })
  @IsString()
  @IsOptional()
  yarnCount?: string;

  @ApiProperty({ example: 'Striped', required: false })
  @IsString()
  @IsOptional()
  pattern?: string;

  @ApiProperty({ example: ['OEKO-TEX', 'GOTS'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string[];

  @ApiProperty({ example: 'kg', description: 'Unit of measurement' })
  @IsString()
  @IsNotEmpty()
  unitOfMeasurement: string;

  @ApiProperty({ example: 500, description: 'Available quantity' })
  @IsNumber()
  @IsNotEmpty()
  availableQuantity: number;

  @ApiProperty({ example: true, description: 'Is manufacturer?', required: false })
  @IsBoolean()
  @IsOptional()
  manufacturer?: boolean;

  @ApiProperty({ example: 'India', required: false })
  @IsString()
  @IsOptional()
  originCountry?: string;

  @ApiProperty({ example: '1000 units per month', required: false })
  @IsString()
  @IsOptional()
  productionCapacity?: string;

  // ---------------- Existing Optional Fields ----------------
  @ApiProperty({ type: [ProductDescriptionDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDescriptionDto)
  @IsOptional()
  description?: ProductDescriptionDto[];

  @ApiProperty({ type: [productSizeRequestDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => productSizeRequestDto)
  @IsOptional()
  size?: productSizeRequestDto[];

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  moq?: number;

  @ApiProperty({ example: ['https://example.com/img1.jpg','https://example.com/img2.jpg'], required: false, format: 'binary' })
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
